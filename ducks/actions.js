import {
  SELECT_GLYPH,
  RESET_LEVEL,
  TOUCH_CORRECT_GLYPH,
  TOUCH_INCORRECT_GLYPH,
  NEXT_CLUE,
  NEW_GAME,
  SET_HIGHSCORE,
  RESTORE_HIGHSCORE,
  RESTORE_HIGHSCORE_SUCCESS
} from './constants'

export function selectGlyph (glyph) {
  return {
    type: SELECT_GLYPH,
    glyph
  }
}

export function setHighscore (score) {
  return {
    type: SET_HIGHSCORE,
    score
  }
}

export function restoreHighscore () {
  return {
    type: RESTORE_HIGHSCORE
  }
}
export function restoreHighscoreSuccess (score) {
  return {
    type: RESTORE_HIGHSCORE_SUCCESS,
    score
  }
}
export function resetGame () {
  return {
    type: NEW_GAME
  }
}
export function correct () {
  return {
    type: TOUCH_CORRECT_GLYPH
  }
}
export function incorrect () {
  return {
    type: TOUCH_INCORRECT_GLYPH
  }
}
export function nextClue () {
  return {
    type: NEXT_CLUE
  }
}

export function resetLevel () {
  return {
    type: RESET_LEVEL
  }
}
