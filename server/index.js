var express = require('express');
var bodyParser = require('body-parser');
var models = require('../db/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var User = models.userModel;
var Game = models.gameInstanceModel;
var queries = require('../db/db-queries.js');
var helpers = require('./helpers.js');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'orange-to-orange'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../client/dist'));

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

app.post('/signup', function (req, res) {
  User.register(new User({username: req.body.username, email: req.body.email}), req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    } 
    passport.authenticate('local')(req, res, function() {
      res.status(201).send('created');
    })
  });
})

app.post('/login', passport.authenticate('local'), function(req, res) {
  res.status(201).send('success')
})

app.get('/test', passport.authenticate('local'), function(req, res) {
  res.status(200).send('success')
})

app.get('/games', function(req, res) {
  var promise = Game.find({}).exec();

  promise.then(function(games) {
    var sortedGames = [];
    var gameNameFirstWords = games.map(function(game){
      // console.log(game, 'game')
      // console.log(game.gameName, 'game.gameName')
      return game.gameName.split(/\W+/, 1)[0].toLowerCase();
    })
    var sortedGameNameFirstWords = gameNameFirstWords.slice().sort();
    for(var i = 0; i < sortedGameNameFirstWords.length; i++){
      var index = gameNameFirstWords.indexOf(sortedGameNameFirstWords[i]);
      sortedGames.push(games[index]);
      gameNameFirstWords[index] = null;
    }
    res.send(sortedGames);
  })
});

app.post('/games', function(req, res) {
  var gameInstance = req.body;

  helpers.addPrompts(gameInstance);

  Game.create(gameInstance, function(err) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send('success creating game in db');
    }
  })
})

app.get('/game', function(req, res) {
  var name = req.query.name;
  var promise = Game.find({gameName: name}).exec();

  promise.then(function(game) {
    res.json(game);
  })
});

app.get('/username', function(req, res) {
  var user = req.session.passport.user;
  res.status(200).send(user);
});


var server = app.listen(port, function() {
  console.log('Server listening on port: ', port);
});

//SOCKETS 

var io = require('socket.io')(server);

//These two objects are meant to keep track of what game each
// Socket is in, and how many players are in a game room
var Sockets = {};
var Rooms = {};

io.on('connection', (socket) => {
  console.log('a user connected to the socket');

  socket.on('join game', function(data) {
    socket.join(data.gameName);
    var username = data.username;
    var gameName = data.gameName;
    Sockets[socket] = gameName;
    Rooms[gameName] ? Rooms[gameName]++ : Rooms[gameName] = 1;
    queries.retrieveGameInstance(gameName)
    .then(function (game){
    // add client to game DB if they're not already in players list
      process.stdout.write('Game object (server/index.js - 129): ');
      process.stdout.write(game);
      if (!Array.prototype.includes.call(game.players, username)) {
        var players = game.players.slice(0);
        players.push(username);
        return queries.addPlayerToGameInstance(gameName, players);
      }
    }).then(function () {
      return queries.retrieveGameInstance(gameName);
    }).then(function (game) {
    // then, check num of players in players list
      // if it's 4 and gameStage is waiting 
      if (game.players.length === 4 && game.gameStage === 'waiting') {
        // update gameStage in db from waiting to playing
        return queries.setGameInstanceGameStageToPlaying(gameName)
        .then(function () {
          return queries.retrieveGameInstance(gameName)
          .then(function (game) {
          // emit 'start game' event and send the game instance obj
            io.to(gameName).emit('start game', game);
          })
        });
      } else {
        io.to(gameName).emit('update waiting room', game);
      }
    }).catch(function(error) {
      console.log(error)
      throw error;
    })
  })

  socket.on('prompt created', (data) => {
    var gameName = data.gameName;
    var prompt = data.prompt;

    queries.retrieveGameInstance(gameName)
    .then(function(game) {
      var currentRound = game.currentRound;
      var Rounds = game.rounds.slice(0);

      Rounds[currentRound].prompt = prompt;
      Rounds[currentRound].stage++;

      queries.updateRounds(gameName, Rounds)
      .then(function() {
        queries.retrieveGameInstance(gameName)
        .then(function(game) {
          io.to(gameName).emit('prompt added', game);
        })
      })
    })
  })


  socket.on('submit response', (data) => {
    var gameName = data.gameName;
    var username = data.username;
    var response = data.response;

    queries.retrieveGameInstance(gameName)
    .then(function(game) {
      var currentRound = game.currentRound;
      var currentResponses = game.rounds[currentRound].responses;
      var currentRounds = game.rounds;

      if (!helpers.userAlreadySubmitted(username, currentResponses)) {
        currentRounds[currentRound].responses.push([response, username]);

        if (currentRounds[currentRound].responses.length === 3) {
          currentRounds[currentRound].stage++;
        }
        //update rounds property of the game in DB w/ new responses and stage
        return queries.updateRounds(gameName, currentRounds)
        .then(function() {
        // check if there are 3 responses
          // if there are 3 responses go to current Round in round array and increment stage by 1
          // retrieve updated game from DB
          // emit 'start judging' with game instance obj as data
          if (currentRounds[currentRound].responses.length === 3) {
            return queries.retrieveGameInstance(gameName)
            .then(function(game) {
              io.to(gameName).emit('start judging', game);
            })
          }
        })
      }
    }).catch(function(error) {
      console.log(error);
      throw error;
    })
  })


  // on 'judge selection' 
  socket.on('judge selection', (data) => {
    var gameName = data.gameName;
    var winner = data.winner;
    queries.retrieveGameInstance(gameName)
    .then(function (game) {
      var currentRound = game.currentRound;
      var currentResponses = game.rounds[currentRound].responses;
      var Rounds = game.rounds.slice(0);
      Rounds[currentRound].winner = winner;
      Rounds[currentRound].stage++;
      queries.updateRounds(gameName, Rounds)
      .then(function () {
        queries.retrieveGameInstance(gameName)
        .then(function (game) {
            if (game.currentRound < 3) {
              io.to(gameName).emit('winner chosen', game);
            } else {
              queries.setGameInstanceGameStageToGameOver(gameName).then(function () {
                queries.retrieveGameInstance(gameName).then(function (game) {
                  io.to(gameName).emit('game over', game);
                })
              })
            }
          })
        })
    }).catch(function(error) {
      console.log(error);
      throw error;
    })
  })
  // 
  socket.on('ready to move on', (data) => {
    var gameName = data.gameName;
    var username = data.username;
    queries.retrieveGameInstance(gameName)
    .then(function(game) {
      var currentRound = game.currentRound;
      var Rounds = game.rounds.slice(0);
      if (!Rounds[currentRound].ready.includes(username)) {
        Rounds[currentRound].ready.push(username);
        queries.updateRounds(gameName, Rounds)
        .then(function() {
          if (Rounds[currentRound].ready.length === 4) {
            currentRound++;
            queries.updateCurrentRound(gameName, currentRound)
            .then(function() {
              queries.retrieveGameInstance(gameName)
              .then(function(game) {
                io.to(gameName).emit('start next round', game);
              })
            })
          }
        })
      }
    }).catch(function(error) {
      console.log(error);
      throw error;
    })
  })


  // The commented out function is meant to be a way to handle disconnects
  // It requires some debugging to be functional, and is therefore currently
  // commented out. When a user disconnects it should check every second 
  // to see if the user has reconnected, but currently the count system 
  // is not properly incrementing.
  socket.on('disconnect', (data) => {
    // if (Rooms[Sockets[socket]]) {
    //   Rooms[Sockets[socket]]--;
    //   var timer = 60;
    //   var disconnectTimeOut = function() {
    //     setTimeout(function(){
    //       if (timer === 0 && Rooms[Sockets[socket]] < 4) {
    //         queries.setGameInstanceGameStageToGameOver(Sockets[socket])
    //         .then(function(){
    //             io.to(Sockets[socket]).emit('disconnectTimeOut');
    //         })
    //       } else {
    //         if (Rooms[Sockets[socket]] < 4) {
    //           timer = timer - 1;
    //           disconnectTimeOut();
    //         }
    //       }
    //     }, 1000);
    //   }
    //   queries.retrieveGameInstance(Sockets[socket])
    //   .then(function(game) {
    //     if (game.gameStage === 'playing') {
    //       disconnectTimeOut();
    //     }
    //   });
    // }

    console.log('a user disconnected', data);
  });
});

