// Import all needed components
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow, mount, render} from 'enzyme';
import Home from './../client/src/components/Home.jsx';
import GameDescription from './../client/src/components/GameDescription.jsx';
import SignUp from './../client/src/components/SignUp.jsx';
import LogIn from './../client/src/components/LogIn.jsx';
import Lobby from './../client/src/components/Lobby.jsx';

// Initialize all of our components for testing
const fun = jest.fn();
const home = mount(<Home sendToLobby={fun} handleSignUp={fun} handleLogIn={fun} />);
const gameDescription = mount(<GameDescription />);
const signUp = mount(<SignUp sendToLobby={fun} />);
const logIn = mount(<LogIn sendToLobby={fun} />);
const lobby = mount(<Lobby sendToGame={fun} disconnectTimeOut={1000}/>);

describe('Individual Component Rendering (Home-Lobby):', () => {

  it('Home should render PageHeader with id #home-header, GameDescription, SignUp, and LogIn', () => {
    expect(home.find('PageHeader #home-header').length).toBe(1);
    expect(home.find('GameDescription').length).toBe(1);
    expect(home.find('SignUp').length).toBe(1);
    expect(home.find('LogIn').length).toBe(1);
  })

  it('GameDescription should have a Col with id of GameDescription', () => {
    expect(gameDescription.find('Col #GameDescription').length).toBe(1);
  })

  it('SignUp should have three FormControls (email, username, password)', () => {
    expect(signUp.find('FormControl').length).toBe(3);
  })

  it('SignUp should have a button', () => {
    expect(signUp.find('Button').length).toBe(1);
  })

  it('LogIn should have two FormControls (username, password)', () => {
    expect(logIn.find('FormControl').length).toBe(2);
  })

  it('LogIn should have a button', () => {
    expect(logIn.find('Button').length).toBe(1);
  })

  it('Lobby should render Col with id #lobby, PageHeader, CreateGame', () => {
    expect(lobby.find('Col #lobby').length).toBe(1);
    expect(lobby.find('PageHeader').length).toBe(1);
    expect(lobby.find('CreateGame').length).toBe(1);
  })

  it('Lobby should render YourGames and GameList when state.games and state.username is set', () => {
    lobby.setState({games: [], username: 'Jest'});
    expect(lobby.find('YourGames').length).toBe(1);
    expect(lobby.find('GameList').length).toBe(1);
  })

})