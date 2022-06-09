import { configureStore } from '@reduxjs/toolkit'
import shuffle from "lodash.shuffle";
import dict from "../challenges";

import { createSlice } from '@reduxjs/toolkit'

const newGame = () => {
  const sixteenRandomCharacters = shuffle(Object.keys(dict)).join``.slice(0, 16);
  const challenges = sixteenRandomCharacters.split``.map(zi => ({ zi, clue: dict[zi] }));
  const randomItemInArray = Math.floor(Math.random() * challenges.length)
  return {
    score: 0,
    chinese: sixteenRandomCharacters,
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
    highscore: 0
  },
  reducers: {
    resetGame(state) {
      const highscore = state.score > state.highscore ? state.score : state.highscore
      return {
        ...state,
        ...newGame(),
        highscore,
        timeOfLastInteraction: Date.now()
      };
    },
    onTouch(state, action) {
      state.timeOfLastInteraction = Date.now()

      if (action.payload !== state.zi) {
        state.score = Math.max(0, state.score - 5);
        return
      }

      const newChallenges = state.challenges.filter(x => x.zi !== state.zi);
      const randomItemInArray = Math.floor(Math.random() * newChallenges.length)
      state.zi=newChallenges[randomItemInArray].zi
      state.clue=newChallenges[randomItemInArray].clue
      // calculate score based on time to answer
      const timeSinceLastInteraction = Math.max(1, (Date.now() - state.timeOfLastInteraction) / 1000);
      state.score = state.score + Math.max(1, Math.floor(10 / Math.floor(timeSinceLastInteraction)));
    },
  }
})
export const { resetGame, onTouch } = gameSlice.actions
const store = configureStore({
  reducer: {
    appData: gameSlice.reducer,
  }
})
export default store