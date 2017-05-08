import {
  SELECT_GLYPH,
  RESET_LEVEL,
  NEW_GAME,
  CREATE_BOARD,
  COMPLETE_BOARD,
  TOUCH_CORRECT_GLYPH,
  NEXT_CLUE,
  TOUCH_INCORRECT_GLYPH,
  RESET_GAME
} from '../constants'
import dict from '../../challenges'
const initialState = {
  error: false,
  label: '',
  clue: 'small 小',
  findMe: '小',
  challenges: Object.keys(dict).map(pinyin => {
    return { pinyin, full: dict[pinyin] }
  }),
  correctAnswer: false,
  correctAnswers: '',
  score: 0
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case RESET_GAME:
      return {
        ...state,
        score: 0
      }
    case TOUCH_CORRECT_GLYPH:
      return {
        ...state,
        score: state.score + 1
      }
    case TOUCH_INCORRECT_GLYPH:
      return {
        ...state,
        score: state.score - 1
      }
    case NEXT_CLUE:
      const n =
        state.challenges[Math.floor(Math.random() * state.challenges.length)]

      return {
        ...state,
        findMe: n.pinyin,
        clue: n.full
      }
    // case NEW_GAME:
    //   const n =
    //     state.challenges[Math.floor(Math.random() * state.challenges.length)]

    //   return {
    //     ...state,
    //     findMe: n.pinyin,
    //     clue: n.full
    //   }
    // case RESET_LEVEL:
    //   const items = state.challenges.filter(
    //     x => !state.label.includes(x.pinyin)
    //   )
    //   const c = items[Math.floor(Math.random() * items.length)]
    //   if (!c) return { ...state }
    //   return {
    //     ...state,
    //     findMe: c.pinyin,
    //     clue: c.full,
    //     challenges: items
    //   }
    // case SELECT_GLYPH:
    //   let b = state.correctAnswers
    //   if (action.glyph === state.findMe) {
    //     state.correctAnswers = true
    //     b += action.glyph
    //   }
    //   return {
    //     ...state,
    //     label: state.label + action.glyph,
    //     correctAnswers: b
    //   }
    default:
      return state
  }
}
