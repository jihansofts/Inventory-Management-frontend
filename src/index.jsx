import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/modal.css";
import "./assets/css/progress.css";
import "./assets/css/bootstrap.css";
import "./assets/css/sidebar.css";
import "./assets/css/scrollbar.css";
import "./assets/css/style.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redox/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
