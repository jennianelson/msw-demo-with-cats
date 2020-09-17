import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js"
    }
  });
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
