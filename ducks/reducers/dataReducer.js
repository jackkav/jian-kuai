import {
  NEW_GAME,
  TOUCH_CORRECT_GLYPH,
  NEXT_CLUE,
  TOUCH_INCORRECT_GLYPH,
  SET_HIGHSCORE,
  RESTORE_HIGHSCORE_SUCCESS
} from '../constants'
import shuffle from 'lodash.shuffle'
import dict from '../../challenges'
const allchinese = shuffle(Object.keys(dict)).join('')
const grid = allchinese.substr(0, 16)
const initialChallenges = grid.split('').map(zi => {
  return { zi, clue: dict[zi] }
})
const initialClue =
  initialChallenges[Math.floor(Math.random() * initialChallenges.length)]

const initialState = {
  error: false,
  label: '',
  clue: initialClue.clue,
  zi: initialClue.zi,
  challenges: initialChallenges,
  correctAnswer: false,
  correctAnswers: '',
  score: 0,
  highscore: 0,
  chinese: shuffle(grid),
  timeOfLastInteraction: new Date(),
  gameStart: new Date()
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case RESTORE_HIGHSCORE_SUCCESS:
      return {
        ...state,
        highscore: +action.score
      }
    case SET_HIGHSCORE:
      return {
        ...state,
        highscore: action.score
      }
    case NEW_GAME:
      const newGrid = allchinese.substr(0, 16)
      const newChallenges = newGrid.split('').map(zi => {
        return { zi, clue: dict[zi] }
      })
      const randomClue =
        newChallenges[Math.floor(Math.random() * newChallenges.length)]

      return {
        ...state,
        score: 0,
        chinese: shuffle(newGrid),
        challenges: newChallenges,
        zi: randomClue.zi,
        clue: randomClue.clue,
        timeOfLastInteraction: new Date()
      }
    case TOUCH_CORRECT_GLYPH:
      e = Math.max(1, (new Date() - state.timeOfLastInteraction) / 1000)
      return {
        ...state,
        score: state.score + Math.max(1, Math.floor(10 / Math.floor(e))),
        timeOfLastInteraction: new Date()
      }
    case TOUCH_INCORRECT_GLYPH:
      return {
        ...state,
        score: Math.max(0,state.score - 10),
        timeOfLastInteraction: new Date()
      }
    case NEXT_CLUE:
    const current = state.zi
    const filteredArray = state.challenges.filter(x=>x.zi!==current)
      const n =
        filteredArray[Math.floor(Math.random() * filteredArray.length)]
      return {
        ...state,
        zi: n.zi,
        clue: n.clue
      }
    default:
      return state
  }
}
