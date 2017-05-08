import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './ducks/configureStore'
import App from './components/App'
const store = configureStore()

export default (ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
))
