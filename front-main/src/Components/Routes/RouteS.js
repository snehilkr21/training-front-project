import React from "react";
import Home from "../Home";
import EditUser from "../EditUser";
import Cards from "../Cards";
import SignUp from "../SignUp";
import LoginForm from "../LoginForm";
import PrivateRoute from "../PrivateRoute";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";

import NavBar from "../NavBar";

function RouteS(props) {
  console.log("14dfnds", props.token);
  return (
    <div>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/edituser/:id" component={EditUser} />
        <Route exact path="/addData" component={EditUser} />
        <Route exact path="/cards" component={Cards} />
       
        {/* <PrivateRoute component={Home} path="/home" exact token={props.token} />
        <PrivateRoute
          component={EditUser}
          path="/edituser/:id"
          token={props.token}
          exact
        />
        <PrivateRoute
          exact
          component={EditUser}
          path="/addData"
          token={props.token}
        />
        <PrivateRoute
          exact
          component={Cards}
          path="/cards"
          token={props.token}
        />
        <PrivateRoute
          exact
          component={SignUp}
          path="/signup"
          token={props.token}
        /> */}

        <Redirect from="*" to={"/home"} />
      </Switch>
    </div>
  );
}

export default RouteS;
