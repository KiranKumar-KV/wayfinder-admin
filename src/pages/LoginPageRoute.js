import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./Login";
import ForgotPassword from "./ForgotPassword";

const LoginPageRoute = () => {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Redirect from="/" to="/login" />
    </Switch>
  );
};

export default LoginPageRoute;
