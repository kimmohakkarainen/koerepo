import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import moment from "moment";
import "moment/locale/fi";
import MomentLocalizer from "react-widgets-moment";
import { Localization } from "react-widgets";

import rapsaState from "./reducers";
import App from "./App";

const store = createStore(
  rapsaState,
  composeWithDevTools(applyMiddleware(thunk))
);

moment.locale("fi");
const localizer = new MomentLocalizer(moment);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Localization date={localizer}>
        <App />
      </Localization>
    </Provider>
  </StrictMode>,
  rootElement
);
