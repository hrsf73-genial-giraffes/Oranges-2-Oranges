'use strict';
import React from 'react';
import Rules from './Rules.jsx';
import ChatBox from './PlayingGameComponents/ChatBox.jsx';
import { Col, PageHeader, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

const getStyle = (game, player) => {
  console.log('getStyle host:', game.host);
  console.log('getStyle user:', player)
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
    <Col id='waiting-room'>
      <PageHeader>{props.game.gameName} <small>Waiting Room</small></PageHeader>
      <h3>Number of Players: {props.game.players.length}</h3>
      <br />
      <h4>Current Players:</h4>
      <Col sm={4} smOffset={4}>
        <ListGroup>
          {props.game.players.map( (player) => <ListGroupItem bsStyle={getStyle(props.game, player)}>{player}</ListGroupItem>)}
        </ListGroup>
      </Col>
      <Col sm={6} smOffset={3}>
        {props.game.host === props.user && <Button disabled={props.buttonDisabled} onClick={props.startGame}>Start Game!</Button>}
        {props.game.host !== props.user && <Button onClick={props.signalReady}>Ready to play!</Button>}
        <Rules/>
        
      </Col>
      <Col id='chat'>
        <ChatBox chats = {props.chats} handleChatSubmission = {props.handleChatSubmission}/>
        </Col>
    </Col>
    

  )
}

export default WaitingRoom;


