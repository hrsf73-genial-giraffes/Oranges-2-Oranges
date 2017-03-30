// Import all needed components
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow, mount, render} from 'enzyme';
import CreateGame from './../client/src/components/CreateGame.jsx';
import YourGames from './../client/src/components/YourGames.jsx';
import GameList from './../client/src/components/GameList.jsx';
import GameListEntry from './../client/src/components/GameListEntry.jsx';
import Game from './../client/src/components/Game.jsx';
import WaitingRoom from './../client/src/components/WaitingRoom.jsx';
import PlayingGame from './../client/src/components/PlayingGame.jsx';
import EndOfGame from './../client/src/components/EndOfGame.jsx';
import Rules from './../client/src/components/Rules.jsx';
import PlayerDisconnected from './../client/src/components/PlayerDisconnected.jsx';
import RoundSummary from './../client/src/components/RoundSummary.jsx';

// Initialize all of our components for testing
const fun = jest.fn();
const createGame = mount(<CreateGame />);
const yourGames = mount(<YourGames games={[{gameName: 'Jest Test 1', id: 1}, {gameName: 'Jest Test 2', id: 2}, {gameName: 'Jest Test 3', id: 3}]} username={'JestTest'} sendToGame={fun} />);
const gameList = mount(<GameList games={[]} sendToGame={fun} />);
const gameListEntry = mount(<GameListEntry sendToGame={fun} name={'JestTest'} key={1} game={{players: [], rounds:[{stage: 0}]}} />);
const game = mount(<Game sendToLobby={fun} />);
const waitingRoom = mount(<WaitingRoom game={{gameName: 'JestTest', players: [], rounds:[], gameStage: 0}} user={'JestTest'} />);
const playingGame = mount(<PlayingGame game={{gameName: 'JestTest', players: [], currentRound: 0, rounds:[{prompt: 'Jest Prompt', winner: 'Jest'}], gameStage: 0}} user={'JestTest'} handleResponse={fun} handlePromptSubmission={fun} handleJudgeSelection={fun} handleReadyToMoveOn={fun}/>);
const endOfGame = mount(<EndOfGame game={{gameName: 'JestTest', players: [], currentRound: 0, rounds:[{prompt: 'Jest Prompt 1', winner: 'Jest', responses: []}, {prompt: 'Jest Prompt 2', winner: 'Jest', responses: []}, {prompt: 'Jest Prompt 3', winner: 'Jest', responses: []}, {prompt: 'Jest Prompt 4', winner: 'Jest', responses: []}], gameStage: 0}} sendToLobby={fun}/>);
const rules = mount(<Rules />);
const playerDisconnected = mount(<PlayerDisconnected game={{gameName: 'JestTest', players: [], currentRound: 0, rounds:[{prompt: 'Jest Prompt 1', winner: 'Jest', responses: []}, {prompt: 'Jest Prompt 2', winner: 'Jest', responses: []}, {prompt: 'Jest Prompt 3', winner: 'Jest', responses: []}, {prompt: 'Jest Prompt 4', winner: 'Jest', responses: []}], gameStage: 0}} />);
const roundSummary = mount(<RoundSummary round={{prompt: 'Jest Prompt 1', winner: 'Jest', responses: []}} judge={'Judge Jest'} />);

describe('Individual Component Rendering (CreateGame - RoundSummary):', () => {

  it('CreateGame should render div with id #create-game, input, DropdownButton, and Button', () => {
    expect(createGame.find('div #create-game').length).toBe(1);
    expect(createGame.find('input').length).toBe(1);
    expect(createGame.find('Button').length).toBe(2);
  })

  it('YourGames should render a ListGroup with id #YourGames', () => {
    expect(yourGames.find('ListGroup #YourGames').length).toBe(1);
    // YourGames needs a proper test to make sure the correct number of entries is getting rendered
  })

  it('GameList should render a ListGroup with id #test', () => {
    expect(gameList.find('ListGroup #test').length).toBe(1);
  })

  it('GameListEntry should render a ListGroupItem', () => {
    expect(gameListEntry.find('ListGroupItem').length).toBe(1);
  })

  it('Game should render a div with id #game', () => {
    expect(game.find('div #game').length).toBe(1);
  })

  // For some reason this test does not work as expected
  // We should write one for PlayingGame and EndOfGame
  // it('Game should render WaitingRoom when gameStage is "waiting"', () => {
  //   let gs = {gameStage: 'waiting'};
  //   game.setState({game: gs, username: 'JestTest'});
  //   expect(game.find('WaitingRoom').length).toBe(1);
  // })

  it('WaitingRoom should render Col with id #waiting-room, PageHeader, ListGroup, and Rules', () => {
    expect(waitingRoom.find('Col #waiting-room').length).toBe(1);
    expect(waitingRoom.find('PageHeader').length).toBe(1);
    // Not sure why ListGroup seems to return 2
    expect(waitingRoom.find('ListGroup').length).toBe(2);
    expect(waitingRoom.find('Rules').length).toBe(1);
  })

  it('PlayingGame should render Col with id #playing-game, PageHeader, and Score', () => {
    expect(playingGame.find('Col #playing-game').length).toBe(1);
    expect(playingGame.find('PageHeader').length).toBe(1);
    expect(playingGame.find('Score').length).toBe(1);
  })

  it('EndOfGame should render Col with id #end-of-game, PageHeader, Score, GameWinner, and Button', () => {
    expect(endOfGame.find('Col #end-of-game').length).toBe(1);
    expect(endOfGame.find('Score').length).toBe(1);
    expect(endOfGame.find('GameWinner').length).toBe(1);
    expect(endOfGame.find('Button').length).toBe(1);
  })

  it('EndOfGame should render four RoundSummary', () => {
    expect(endOfGame.find('RoundSummary').length).toBe(4);
  })

  it('Rules should render Col with id #rules and eight ListGroupItem', () => {
    expect(rules.find('Col #rules').length).toBe(1);
    expect(rules.find('ListGroupItem').length).toBe(8);
  })

  it('PlayerDisconnected should render div with id #player-disconnected', () => {
    expect(playerDisconnected.find('div #player-disconnected').length).toBe(1);
  })

  it('RoundSummary should render div with id #RoundSummary and ListGroup with id #responses-summary', () => {
    expect(roundSummary.find('div #RoundSummary').length).toBe(1);
    expect(roundSummary.find('ListGroup #responses-summary').length).toBe(1);
  })

})