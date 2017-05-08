import {
  SELECT_GLYPH,
  RESET_LEVEL,
  TOUCH_CORRECT_GLYPH,
  TOUCH_INCORRECT_GLYPH,
  NEXT_CLUE,
  RESET_GAME
} from './constants'

export function selectGlyph (glyph) {
  return {
    type: SELECT_GLYPH,
    glyph
  }
}

export function resetGame () {
  return {
    type: RESET_GAME
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

export function resetLevel (glyph) {
  return {
    type: RESET_LEVEL
  }
}
