import { configureStore } from '@reduxjs/toolkit'
import shuffle from "lodash.shuffle";
import dict from "../challenges";

import { createSlice } from '@reduxjs/toolkit'

const allchinese = shuffle(Object.keys(dict)).join``;
const grid = allchinese.slice(0, 16);
const initialChallenges = grid.split``.map(zi => {
  return { zi, clue: dict[zi] };
});
const randomItemInArray = Math.floor(Math.random() * initialChallenges.length)
const initialClue = initialChallenges[randomItemInArray];

const initialState = {
  error: false,
  label: "",
  clue: initialClue.clue,
  zi: initialClue.zi,
  challenges: initialChallenges,
  correctAnswer: false,
  correctAnswers: "",
  score: 0,
  highscore: 0,
  chinese: shuffle(grid),
  timeOfLastInteraction: Date.now(),
  gameStart: Date.now()
};

const gameSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    setHighscore(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.highscore = action.payload
    },
    resetGame(state) {
      const newGrid = allchinese.substr(0, 16);
      const newChallenges = newGrid.split``.map(zi => {
        return { zi, clue: dict[zi] };
      });
      const randomItemInArray = Math.floor(Math.random() * newChallenges.length)
      const randomClue = newChallenges[randomItemInArray];
      return {
        ...state,
        score: 0,
        chinese: shuffle(newGrid),
        challenges: newChallenges,
        zi: randomClue.zi,
        clue: randomClue.clue,
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