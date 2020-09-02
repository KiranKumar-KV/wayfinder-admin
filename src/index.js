import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import LoginRoute from "./pages/LoginRoute";

ReactDOM.render(
  <BrowserRouter>
    <LoginRoute />
  </BrowserRouter>,
  document.getElementById("root")
);
