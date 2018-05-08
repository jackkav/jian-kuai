import { createStore, applyMiddleware } from 'redux'
import app from './reducers'

import { createEpicMiddleware } from 'redux-observable'
import fetchUserEpic from './epic'


export default function configureStore () {
  const store = createStore(
    app,
    applyMiddleware(createEpicMiddleware(fetchUserEpic))
  )
  return store
}
