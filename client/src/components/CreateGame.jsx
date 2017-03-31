'use strict';
import React from 'react';
import $ from 'jquery';
import { DropdownButton, MenuItem, Button, Form, FormGroup, Col, FormControl, ControlLabel, PageHeader } from 'react-bootstrap';
var Filter = require('bad-words');
var filter = new Filter();

var hostUrl = process.env.LIVE_URL || 'http://localhost:3000/';

class CreateGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameName: '',
      promptType: 'random',
      error: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.addGameToDB = this.addGameToDB.bind(this);
    this.handlePromptTypeSelection = this.handlePromptTypeSelection.bind(this);
  }

  handleChange(event) {
    var filteredGameName = filter.clean(event.target.value)
    this.setState({gameName: filteredGameName});
  }

  addGameToDB(gameName, promptType, callback) {

    ////change to be strings
    var initialStage = (promptType === 'random' || promptType === 'memes') ? 0 : -1;

    var gameInstance = {
      gameName: gameName,
      password: '',
      players: [],
      category: promptType,
      rounds: [
      {prompt: 'prompt 1', responses: [], winner: '', stage: initialStage, ready: []}, 
      {prompt: 'prompt 2', responses: [], winner: '', stage: initialStage, ready: []}, 
      {prompt: 'prompt 3', responses: [], winner: '', stage: initialStage, ready: []}, 
      {prompt: 'prompt 4', responses: [], winner: '', stage: initialStage, ready: []}],
      currentRound: 0
    }

    $.ajax({
      url: '/games',
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: JSON.stringify(gameInstance),
      success: (data) => {
        callback(gameName);
      },
      error: (err) => {
        console.log('error in login POST: ', err);
        this.setState({
          error: true
        })
      }
    });
  }

  handlePromptTypeSelection(promptType) {
    this.setState({promptType: promptType})
  }

  render() {

    const errorMessage = <p><b>That game name has already been taken. Please try again with a different game name!</b></p>

    return (
      <div id="create-game">
        <h4>Start a New Game</h4>
          {this.state.error && errorMessage}
          <input placeholder="Name your game..." type="text" value={this.state.gameName} onChange={this.handleChange} />
          <DropdownButton bsSize="small" title='Prompt-Type' id='0'>
            <MenuItem eventKey="1" onSelect={() => this.handlePromptTypeSelection('random')}>Random</MenuItem>
            <MenuItem eventKey="2" onSelect={() => this.handlePromptTypeSelection('user-generated')}>User-generated</MenuItem>
            <MenuItem eventKey="3" onSelect={() => this.handlePromptTypeSelection('memes')}>Memes</MenuItem>
          </DropdownButton>
          <Button bsSize="small" onClick={() => this.addGameToDB(this.state.gameName, this.state.promptType, this.props.sendToGame)}>Submit</Button>
      </div>
    )
  }
}
export default CreateGame;