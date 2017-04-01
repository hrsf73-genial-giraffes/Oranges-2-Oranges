'use strict';
import React from 'react';
import WaitingRoom from './WaitingRoom.jsx';
import PlayingGame from './PlayingGame.jsx';
import EndOfGame from './EndOfGame.jsx';
import $ from 'jquery';
import io from 'socket.io-client';
import { PageHeader } from 'react-bootstrap';

var hostUrl = process.env.LIVE_URL || 'http://localhost:3000/';

const socket = io();

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      game: null,
      username: null,
      chats: [],
      disabled: true
    };

    this.getGameData = this.getGameData.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handlePromptSubmission = this.handlePromptSubmission.bind(this);
    this.handleJudgeSelection = this.handleJudgeSelection.bind(this);
    this.handleReadyToMoveOn = this.handleReadyToMoveOn.bind(this);
    this.handleChatSubmission = this.handleChatSubmission.bind(this);
    this.startGame = this.startGame.bind(this);
    this.signalReady = this.signalReady.bind(this);

    socket.on('update waiting room', (gameObj) => {
      this.setState({game: gameObj});
    })
    socket.on('start game', (gameObj) => {
      this.setState({game: gameObj});
    })
    socket.on('prompt added', (gameObj) => {
      this.setState({game: gameObj});
    })
    socket.on('start judging', (gameObj) => {
      this.setState({game: gameObj});
    })
    socket.on('winner chosen', (gameObj) => {
      this.setState({game: gameObj});
    })
    socket.on('start next round', (gameObj) => {
      this.setState({game: gameObj});
    })
    socket.on('game over', (gameObj) => {
      this.setState({game: gameObj});
    })
    socket.on('chat added', (chats) => {
      this.setState({chats: chats})
    })
    socket.on('disconnectTimeOut', () => {
      console.log('disconnectTimeOut')
      this.props.route.sendToLobby.call(this, true);
    })
    socket.on('all ready', (gameObj) => {
      console.log('All Players Ready');
      this.setState({game: gameObj, disabled: false});
    })

  }

  componentDidMount() {
    if (this.props.params) {
      this.getGameData(this.props.params.gamename);
      this.getUsername();
    }

    if (this.state.game && this.state.game.gameStage === 'w') {
      this.setState({game: {gameStage: 'waiting'}});
    }
  }

  socketHandlers() {
    //TODO: check best practice for socket events
    // on 'start game', set game state to be data (game instance obj)

    // emit 'submit response', send response and gamename and username as data to that socket room

    // on 'start judging', set game state to new game instance obj data

    // emit 'judge selection', send username of winner, gamename

    // on 'winner chosen', update game state with new game instance obj

    // emit 'ready to move on', send username and gamename

    // on 'start next round', update game state with new game instance obj

    // on 'game over', update game state w/ new game instance obj
  }

  getGameData(gameName) {
    // use gameName to retrieve gameInstance obj of that game
    $.ajax({
      url: '/game',
      method: 'GET',
      headers: {'content-type': 'application/json'},
      data: {name: gameName},
      success: (data) => {
        this.setState({game: data[0]})
      },
      error: (err) => {
        console.log('error getting games: ', err);
      }
    });
  }

  getUsername() {
    $.ajax({
      url: '/username',
      method: 'GET',
      headers: {'content-type': 'application/json'},
      success: (username) => {
        this.setState({username: username}, function() {
          socket.emit('join game', {gameName: this.props.params.gamename, username: this.state.username});
        });
      },
      error: (err) => {
        console.log('error getting username', err);
      }
    });
  }

  startGame() {
    socket.emit('host start', {gameName: this.props.params.gamename, username: this.state.username});
  }

  signalReady() {
    socket.emit('ready to start', {gameName: this.props.params.gamename, username: this.state.username});
  }

  handleResponse(response) {
    socket.emit('submit response', {gameName: this.props.params.gamename, username: this.state.username, response: response});
  }

  handleJudgeSelection(winner) {
    socket.emit('judge selection', {gameName: this.props.params.gamename, winner: winner});
  }

  handleReadyToMoveOn() {
    socket.emit('ready to move on', {gameName: this.props.params.gamename, username: this.state.username});
  }

  handlePromptSubmission(prompt) {
    socket.emit('prompt created', {gameName: this.props.params.gamename, prompt: prompt});
  }

  handleChatSubmission(chat) {
    socket.emit('chat created', {gameName: this.props.params.gamename, username: this.state.username, chats: this.state.chats, chat: chat});
  }

  render() {
    let stl;
    if (this.props.route) {
      stl = this.props.route.sendToLobby;
    } else {
      stl = this.props.sendToLobby;
    }

    return (
      <div id="game">
        {this.state.game && this.state.username && this.state.game.gameStage === 'waiting' && <WaitingRoom game={this.state.game} buttonDisabled={this.state.disabled} user={this.state.username} startGame={this.startGame} signalReady={this.signalReady} chats={this.state.chats} handleChatSubmission={this.handleChatSubmission} />}
        {this.state.game && this.state.username && this.state.game.gameStage === 'playing' && <PlayingGame game={this.state.game} user={this.state.username} chats={this.state.chats} handleResponse={this.handleResponse} handlePromptSubmission={this.handlePromptSubmission} handleJudgeSelection={this.handleJudgeSelection} handleReadyToMoveOn={this.handleReadyToMoveOn} handleChatSubmission={this.handleChatSubmission}/>}
        {this.state.game && this.state.username && this.state.game.gameStage === 'gameover' && <EndOfGame game={this.state.game} sendToLobby={stl}/>}
      </div>
    )
  }
}

export default Game;