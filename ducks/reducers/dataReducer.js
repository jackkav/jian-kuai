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

import shuffle from 'lodash.shuffle'
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
  score: 0,
  chinese: shuffle('大小中饭面肉牛鸡猪鞋上下左右前后')
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case RESET_GAME:
      return {
        ...state,
        score: 0,
        chinese: shuffle('大小中饭面肉牛鸡猪鞋上下左右前后')
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
    default:
      return state
  }
}
