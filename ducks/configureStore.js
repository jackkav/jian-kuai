import { configureStore } from '@reduxjs/toolkit'
import shuffle from "lodash.shuffle";
import dict from "../challenges";

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { saveHighscore } from './highscore';

const allchinese = shuffle(Object.keys(dict)).join``;
const grid = allchinese.substr(0, 16);
const initialChallenges = grid.split``.map(zi => {
  return { zi, clue: dict[zi] };
});
const initialClue =
  initialChallenges[Math.floor(Math.random() * initialChallenges.length)];

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



export const fetchHighscore = createAsyncThunk('appData/fetchHighscore', async () => {
  const score = await getHighscore()
  return score
})

const gameSlice = createSlice({
  name: 'appData',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchHighscore.fulfilled, (state, action) => {
        state.highscore = +action.score
      })
  },
  reducers: {
    setHighscore(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.highscore = +action.score
      saveHighscore(+action.score)
    },
    restoreHighscore(state, action) {
      state.highscore = 0
    },
    resetGame(state) {
      const newGrid = allchinese.substr(0, 16);
      const newChallenges = newGrid.split``.map(zi => {
        return { zi, clue: dict[zi] };
      });
      const randomClue =
        newChallenges[Math.floor(Math.random() * newChallenges.length)];
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
      let e = Math.max(1, (Date.now() - state.timeOfLastInteraction) / 1000);
      const current = state.zi;
      const filteredArray = state.challenges.filter(x => x.zi !== current);
      const n = filteredArray[Math.floor(Math.random() * filteredArray.length)];
      return {
        ...state,
        score: state.score + Math.max(1, Math.floor(10 / Math.floor(e))),
        timeOfLastInteraction: Date.now(),
        zi: n.zi,
        clue: n.clue
      };
    },
    incorrect(state) {
      return {
        ...state,
        score: Math.max(0, state.score - 10),
        timeOfLastInteraction: Date.now()
      };
    },
  }
})
export const { restoreHighscore, setHighscore, resetGame, correct, incorrect } = gameSlice.actions
const store = configureStore({
  reducer: {
    appData: gameSlice.reducer,
  }
})
export default store