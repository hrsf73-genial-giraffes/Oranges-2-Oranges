// Import all needed components
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow, mount, render} from 'enzyme';
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

describe('Individual Components Rendering (All PlayingGameComponents):', () => {
  
  it('Score should render Table', () => {
    expect(score.find('Table').length).toBe(1);
  })

  it('Prompt should render Col with id #prompt and Panel', () => {
    expect(prompt.find('Col #prompt').length).toBe(1);
    expect(prompt.find('Panel').length).toBe(1);
  })

  it('CreatePrompt should render Col with id #submit-prompt, FormControl, and Button', () => {
    expect(createPrompt.find('Col #submit-prompt').length).toBe(1);
    expect(createPrompt.find('FormControl').length).toBe(1);
    expect(createPrompt.find('Button').length).toBe(1);
  })

  it('JudgeCreatingPrompt should render div with id #judge-creating', () => {
    expect(judgeCreatingPrompt.find('div #judge-creating').length).toBe(1);
  })

  it('PlayersResponding should render div with id #players-responding', () => {
    expect(playersResponding.find('div #players-responding').length).toBe(1);
  })

  it('RespondToPrompt should render Col with id #submit-response', () => {
    expect(respondToPrompt.find('Col #submit-response').length).toBe(1);
  })

  it('ChooseWinner should render ListGroup with id #choose-winner', () => {
    expect(chooseWinner.find('ListGroup #choose-winner').length).toBe(1);
  })

  it('SeeResponses should render ListGroup with id #see-responses', () => {
    expect(seeResponses.find('ListGroup #see-responses').length).toBe(1);
  })

  it('Winner should render ListGroup with id #winner', () => {
    expect(winner.find('ListGroup #winner').length).toBe(1);
  })

  it('CurrentJudge should render Col with id #current-judge and Panel', () => {
    expect(currentJudge.find('Col #current-judge').length).toBe(1);
    expect(currentJudge.find('Panel').length).toBe(1);
  })

  it('GameWinner should render Col with id #GameWinner and Panel', () => {
    expect(gameWinner.find('Col #GameWinner').length).toBe(1);
    expect(gameWinner.find('Panel').length).toBe(1);
  })

})