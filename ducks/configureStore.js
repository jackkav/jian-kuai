import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import app from './reducers'

import { createEpicMiddleware } from 'redux-observable'
import fetchUserEpic from './epic'

const epicMiddleware = createEpicMiddleware(fetchUserEpic)

export default function configureStore () {
  const store = createStore(
    app,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  )
  return store
}
