'use strict';
import React from 'react';
import GameList from './GameList.jsx';
import $ from 'jquery';
import CreateGame from './CreateGame.jsx';
import YourGames from './YourGames.jsx';
import PlayerDisconnected from './PlayerDisconnected.jsx'
import { Button, Form, FormGroup, Col, FormControl, ControlLabel, PageHeader } from 'react-bootstrap';
var hostUrl = process.env.LIVE_URL || 'http://localhost:3000/';

//TODO:
  // build logic to prevent users from joining a full game

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: null,
      username: null
    }
    this.getGames = this.getGames.bind(this);
  }

  componentDidMount() {
    if (this.props.route) {
      this.getGames();
      this.getUsername();
    }
  }

  getGames() {
    $.ajax({
      url: '/games',
      method: 'GET',
      headers: {'content-type': 'application/json'},
      success: (data) => {
        console.log('got games: ', data);
        this.setState({
          games: data
        })
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
        this.setState({username: username})
      },
      error: (err) => {
        console.log('error getting username', err);
      }
    });
  }

  render() {
    let stg;
    // React router will pass props down through this.props.route
    // So we check to see if the route property exists
    // Else we assume we are testing and stg will reference this.props instead
    if (this.props.route) {
      stg = this.props.route.sendToGame;
    } else {
      stg = this.props.sendToGame;
    }

    return (

      <Col id="lobby" sm={6} smOffset={3}>
        <PageHeader>Lobby</PageHeader>
        {this.props.disconnectTimeOut && <PlayerDisconnected/>}
        <CreateGame sendToGame={stg}/>
        {this.state.games && <YourGames games={this.state.games} username={this.state.username} sendToGame={stg}/>}
        <h4>Current Games:</h4>
        {this.state.games && <GameList games={this.state.games} sendToGame={stg}/>}
      </Col>
      
    )
  }
}
export default Lobby;