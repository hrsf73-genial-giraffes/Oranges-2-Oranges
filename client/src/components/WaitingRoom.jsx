'use strict';
import React from 'react';
import Rules from './Rules.jsx';
import ChatBox from './PlayingGameComponents/ChatBox.jsx';
import { Col, PageHeader, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

const getStyle = (game, player) => {
  if (game.host === player) {
    return 'info';
  } else if (game.allReady) {
    return game.allReady.indexOf(player) === -1 ? 'danger' : 'success';
  } else {
    return 'danger';
  }
}

const WaitingRoom = (props) => {

  return (
    <div>
      <PageHeader>{props.game.gameName} <small>Waiting Room</small></PageHeader>
      <h3>Number of Players: {props.game.players.length}</h3>
      <br />
      <Col sm={5} smOffset={1} id='waiting-room'>
        <h4>Current Players:</h4>
        <Col sm={8} smOffset={2}>
          <ListGroup>
            {props.game.players.map( (player) => <ListGroupItem bsStyle={getStyle(props.game, player)}>{player}</ListGroupItem>)}
          </ListGroup>
        </Col>
        <Col sm={10} smOffset={1}>
          {props.game.host === props.user && <Button disabled={props.buttonDisabled} onClick={props.startGame}>Start Game!</Button>}
          {props.game.host !== props.user && <Button onClick={props.signalReady}>Ready to play!</Button>}
          <Rules/>  
        </Col>
      </Col>
      <Col sm={5} class="chatContainer">
        <ChatBox chats={props.chats} handleChatSubmission={props.handleChatSubmission}/>
      </Col>
    </div>
  )
}

export default WaitingRoom;


