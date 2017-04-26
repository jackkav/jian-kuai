import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  SELECT_GLYPH
} from '../constants'
const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false,
  label: '',
  count: 0
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case SELECT_GLYPH:
      return {
        ...state,
        label: state.label + action.glyph
      }
    default:
      return state
  }
}
