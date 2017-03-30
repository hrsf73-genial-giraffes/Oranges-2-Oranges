'use strict';
import React from 'react';
import SignUp from './SignUp.jsx';
import LogIn from './LogIn.jsx';
import GameDescription from './GameDescription.jsx';
import { Col, PageHeader} from 'react-bootstrap';

// props.game === game instance object

const Home = (props) => {
  let stl;
  if (props.route) {
    stl = props.route.sendToLobby;
  } else {
    stl = props.sendToLobby;
  }

  return (
    <Col id="home">
      <PageHeader id="home-header">Oranges to Oranges</PageHeader>
      <Col>
        <GameDescription />
      </Col>
      <Col sm={4} smOffset={4}>
      <SignUp sendToLobby={stl}/>
      <LogIn sendToLobby={stl} />
      </Col>
    </Col>
  )
}


export default Home;