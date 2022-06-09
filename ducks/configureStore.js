import { configureStore, createSlice } from "@reduxjs/toolkit";
import shuffle from "lodash.shuffle";

import dict from "../challenges";

const newGame = () => {
  const shuffledCharacters = shuffle(Object.keys(dict)).join``.slice(0, 16);
  const challenges = shuffledCharacters.split``.map((expectedCharacter) => ({
    expectedCharacter,
    expectedEmoji: dict[expectedCharacter],
  }));
  const randomItemInArray = Math.floor(Math.random() * challenges.length);
  return {
    score: 0,
    shuffledCharacters,
    challenges,
    ...challenges[randomItemInArray],
    timeOfLastInteraction: Date.now(),
  };
};
const gameSlice = createSlice({
  name: "appData",
  initialState: {
    ...newGame(),
    timeOfLastInteraction: Date.now(),
    highscore: 0,
  },
  reducers: {
    resetGame(state) {
      const highscore =
        state.score > state.highscore ? state.score : state.highscore;
      return {
        ...state,
        ...newGame(),
        highscore,
        timeOfLastInteraction: Date.now(),
      };
    },
    onTouch(state, action) {
      state.timeOfLastInteraction = Date.now();

      if (action.payload !== state.expectedCharacter) {
        state.score = Math.max(0, state.score - 5);
        return;
      }

      const newChallenges = state.challenges.filter(
        (x) => x.expectedCharacter !== state.expectedCharacter
      );
      const randomItemInArray = Math.floor(
        Math.random() * newChallenges.length
      );
      state.expectedCharacter =
        newChallenges[randomItemInArray].expectedCharacter;
      state.expectedEmoji = newChallenges[randomItemInArray].expectedEmoji;
      // calculate score based on time to answer
      const timeSinceLastInteraction = Math.max(
        1,
        (Date.now() - state.timeOfLastInteraction) / 1000
      );
      state.score =
        state.score +
        Math.max(1, Math.floor(10 / Math.floor(timeSinceLastInteraction)));
    },
  },
});
export const { resetGame, onTouch } = gameSlice.actions;
const store = configureStore({
  reducer: {
    appData: gameSlice.reducer,
  },
});
export default store;
