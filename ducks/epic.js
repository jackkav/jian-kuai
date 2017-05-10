import { RESTORE_HIGHSCORE } from './constants'
import { restoreHighscoreSuccess } from './actions'
import { getHighscore } from '../ducks/highscore'
import 'rxjs'
import { Observable } from 'rxjs/Observable'

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
