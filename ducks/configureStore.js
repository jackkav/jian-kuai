import { configureStore } from '@reduxjs/toolkit'
import shuffle from "lodash.shuffle";
import dict from "../challenges";

import { createSlice } from '@reduxjs/toolkit'

const newGame = () =>{
  const sixteenRandomCharacters = shuffle(Object.keys(dict)).join``.slice(0, 16);
  const challenges = sixteenRandomCharacters.split``.map(zi => ({ zi, clue: dict[zi] }));
  const randomItemInArray = Math.floor(Math.random() * challenges.length)
  return {
    score: 0,
    chinese:sixteenRandomCharacters,
    challenges,
    zi: challenges[randomItemInArray].zi,
    clue: challenges[randomItemInArray].clue,
    timeOfLastInteraction: Date.now()
  };
}
const gameSlice = createSlice({
  name: 'appData',
  initialState: {
    ...newGame(),
    timeOfLastInteraction: Date.now(),
    highscore:0
  },
  reducers: {
    setHighscore(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.highscore = action.payload
    },
    resetGame(state) {
      return {
        ...state,
        ...newGame(),
        timeOfLastInteraction: Date.now()
      };
    },
    correct(state) {
      const timeSinceLastInteraction = Math.max(1, (Date.now() - state.timeOfLastInteraction) / 1000);
      const correctAnswer = state.zi;
      const newChallenges = state.challenges.filter(x => x.zi !== correctAnswer);
      const randomItemInArray = Math.floor(Math.random() * newChallenges.length)
      const randomNextClue = newChallenges[randomItemInArray];
      return {
        ...state,
        score: state.score + Math.max(1, Math.floor(10 / Math.floor(timeSinceLastInteraction))),
        timeOfLastInteraction: Date.now(),
        zi: randomNextClue.zi,
        clue: randomNextClue.clue
      };
    },
    incorrect(state) {
      return {
        ...state,
        score: Math.max(0, state.score - 5),
        timeOfLastInteraction: Date.now()
      };
    },
  }
})
export const { setHighscore, resetGame, correct, incorrect } = gameSlice.actions
const store = configureStore({
  reducer: {
    appData: gameSlice.reducer,
  }
})
export default store