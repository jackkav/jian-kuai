import React from "react";
import { Provider } from "react-redux";

import App2 from "./components/App";
import store from "./ducks/configureStore";

export default () => {
  return (
    <Provider store={store}>
      <App2 />
    </Provider>
  );
};
