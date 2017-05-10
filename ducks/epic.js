import { FETCHING_DATA, RESTORE_HIGHSCORE } from './constants'
import {
  getDataSuccess,
  getDataFailure,
  restoreHighscore,
  restoreHighscoreSuccess
} from './actions'
import getPeople from './api'
import { getHighscore } from '../ducks/highscore'
import 'rxjs'
import { Observable } from 'rxjs/Observable'

const fetchUserEpic = action$ =>
  action$
    .ofType(FETCHING_DATA)
    .mergeMap(action =>
      Observable.fromPromise(getPeople())
        .map(response => getDataSuccess(response))
        .catch(error => Observable.of(getDataFailure(error)))
    )
const fetchHighscore = action$ =>
  action$.ofType(RESTORE_HIGHSCORE).mergeMap(action =>
    Observable.fromPromise(getHighscore())
      .map(response => restoreHighscoreSuccess(response))
      .catch(error => {
        console.log(error)
        return Observable.empty()
      })
  )

export default fetchHighscore
