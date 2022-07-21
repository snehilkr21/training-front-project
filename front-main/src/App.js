import React from "react";
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import RouteS from "./Components/Routes/RouteS";
import { confirmLogin } from "./redux/AsyncAction";
import { setToken } from "./redux/AsyncAction";
import NavBar from "./Components/NavBar";
import LoginForm from "./Components/LoginForm";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";

function App(props) {
  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("login"));
    if (temp.isloginin == "true") props.setToken();
  }, [props.token]);

  return (
    <>
      <Router>
        {props.token === true ? (
          <>
            <NavBar />
            <RouteS token={props.token} />
          </>
        ) : (
          <>
            <Redirect from="*" to={"/"} />
            <Route component={LoginForm} path="/" exact />
            <Route exact path="/signup" component={SignUp} />
          </>
        )}
      </Router>
    </>
  );
}
const mapStateToProps = (state) => ({
  loginMessage: state.LRequestReducer.loginMessage,
  token: state.LRequestReducer.token,
});

const mapDispatchToProps = {
  confirmLogin,
  setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
