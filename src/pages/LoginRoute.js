import React from "react";
import App from "../App";
import LoginPageRoute from "./LoginPageRoute";

const LoginRoute = () => {
  if (localStorage.getItem("token")) {
    return <App />;
  }
  return <LoginPageRoute />;
};

export default LoginRoute;
