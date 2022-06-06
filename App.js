import React from 'react'
import { Provider } from 'react-redux'
import store from './ducks/configureStore'
import App2 from './components/App'

export default () => {
  return (
    <Provider store={store}>
      <App2 />
    </Provider>
  );
}

