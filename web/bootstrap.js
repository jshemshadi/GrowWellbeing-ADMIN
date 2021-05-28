// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import configStore from "./store/configStore";
import { createBrowserHistory } from "history";

window._ = require("lodash");
window.utils = require("./utils");
window.systemError = require("./systemError");

const history = createBrowserHistory();
const store = configStore(history);

import App from "./App";

ReactDOM.render(
  <App history={history} store={store} />,
  document.getElementById("app")
);
