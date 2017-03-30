// Import all needed components
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow, mount, render} from 'enzyme';
import Home from './../client/src/components/Home.jsx';
import GameDescription from './../client/src/components/GameDescription.jsx';
import SignUp from './../client/src/components/SignUp.jsx';
import LogIn from './../client/src/components/LogIn.jsx';
import Lobby from './../client/src/components/Lobby.jsx';
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
import Score from './../client/src/components/PlayingGameComponents/Score.jsx';
import Prompt from './../client/src/components/PlayingGameComponents/Prompt.jsx';
import CreatePrompt from './../client/src/components/PlayingGameComponents/CreatePrompt.jsx';
import JudgeCreatingPrompt from './../client/src/components/PlayingGameComponents/JudgeCreatingPrompt.jsx';
import PlayersResponding from './../client/src/components/PlayingGameComponents/PlayersResponding.jsx';
import RespondToPrompt from './../client/src/components/PlayingGameComponents/RespondToPrompt.jsx';
import ChooseWinner from './../client/src/components/PlayingGameComponents/ChooseWinner.jsx';
import SeeResponses from './../client/src/components/PlayingGameComponents/SeeResponses.jsx';
import Winner from './../client/src/components/PlayingGameComponents/Winner.jsx';
import CurrentJudge from './../client/src/components/PlayingGameComponents/CurrentJudge.jsx';
import GameWinner from './../client/src/components/PlayingGameComponents/GameWinner.jsx';

// Initialize all of our components for testing
const fun = jest.fn();
const home = mount(<Home sendToLobby={fun} handleSignUp={fun} handleLogIn={fun} />);
const gameDescription = mount(<GameDescription />);
const signUp = mount(<SignUp sendToLobby={fun} />);
const logIn = mount(<LogIn sendToLobby={fun} />);
const lobby = mount(<Lobby sendToGame={fun} disconnectTimeOut={1000}/>);
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
const score = mount(<Score game={{gameName: 'JestTest', players: [], currentRound: 0, rounds:[{prompt: 'Jest Prompt 1', winner: 'Jest', responses: []}, {prompt: 'Jest Prompt 2', winner: 'Jest', responses: []}, {prompt: 'Jest Prompt 3', winner: 'Jest', responses: []}, {prompt: 'Jest Prompt 4', winner: 'Jest', responses: []}], gameStage: 0}} />)
const prompt = mount(<Prompt prompt={'Jest Prompt'} />)
const createPrompt = mount(<CreatePrompt handlePromptSubmission={fun} />);
const judgeCreatingPrompt = mount(<JudgeCreatingPrompt judge={'Jest'} />);
const playersResponding = mount(<PlayersResponding />);
const respondToPrompt = mount(<RespondToPrompt handleResponse={fun} />);
const chooseWinner = mount(<ChooseWinner responses={[]} handleJudgeSelection={fun}/>);
const seeResponses = mount(<SeeResponses responses={[]} />);
const winner = mount(<Winner responses={[]} winner={'Jest'} handleReadyToMoveOn={fun} />);
const currentJudge = mount(<CurrentJudge judge={'Judge Jest'} />);
const gameWinner = mount(<GameWinner game={{gameName: 'JestTest', players: [], currentRound: 0, rounds:[{prompt: 'Jest Prompt 1', winner: 'Jest', responses: []}, {prompt: 'Jest Prompt 2', winner: 'Jest', responses: []}, {prompt: 'Jest Prompt 3', winner: 'Jest', responses: []}, {prompt: 'Jest Prompt 4', winner: 'Jest', responses: []}], gameStage: 0}} />);

// Make sure all components mounted properly
describe('Mounting components:', () => {
 
  it('Home should mount', () => {
    expect(home).toBeDefined();
  })

  it('GameDescription should mount', () => {
    expect(gameDescription).toBeDefined();
  })

  it('SignUp should mount', () => {
    expect(signUp).toBeDefined();
  })

  it('LogIn should mount', () => {
    expect(logIn).toBeDefined();
  })

  it('Lobby should mount', () => {
    expect(lobby).toBeDefined();
  })

  it('CreateGame should mount', () => {
    expect(createGame).toBeDefined();
  })
 
  it('YourGames should mount', () => {
    expect(yourGames).toBeDefined();
  })

  it('GameList should mount', () => {
    expect(gameList).toBeDefined();
  })

  it('GameListEntry should mount', () => {
    expect(gameListEntry).toBeDefined();
  })

  it('Game should mount', () => {
    expect(game).toBeDefined();
  })

  it('WaitingRoom should mount', () => {
    expect(waitingRoom).toBeDefined();
  })

  it('PlayingGame should mount', () => {
    expect(playingGame).toBeDefined();
  })

  it('EndOfGame should mount', () => {
    expect(endOfGame).toBeDefined();
  })

  it('Rules should mount', () => {
    expect(rules).toBeDefined();
  })

  it('PlayerDisconnected should mount', () => {
    expect(playerDisconnected).toBeDefined();
  })

  it('RoundSummary should mount', () => {
    expect(roundSummary).toBeDefined();
  })

  it('Score should mount', () => {
    expect(score).toBeDefined();
  })

  it('Prompt should mount', () => {
    expect(prompt).toBeDefined();
  })

  it('CreatePrompt should mount', () => {
    expect(createPrompt).toBeDefined();
  })

  it('JudgeCreatingPrompt should mount', () => {
    expect(judgeCreatingPrompt).toBeDefined();
  })

  it('PlayersResponding should mount', () => {
    expect(playersResponding).toBeDefined();
  })

  it('RespondToPrompt should mount', () => {
    expect(respondToPrompt).toBeDefined();
  })

  it('ChooseWinner should mount', () => {
    expect(chooseWinner).toBeDefined();
  })

  it('SeeResponses should mount', () => {
    expect(seeResponses).toBeDefined();
  })

  it('Winner should mount', () => {
    expect(winner).toBeDefined();
  })

  it('CurrentJudge should mount', () => {
    expect(currentJudge).toBeDefined();
  })

  it('GameWinner should mount', () => {
    expect(gameWinner).toBeDefined();
  })


})