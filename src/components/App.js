import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import { useAuth } from "./contexts/AuthProvider";

import "../stylesheets/App.css";

function App() {
  const { auth } = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/sign-up" exact component={SignUp} />
        {auth.loggedIn ? (
          <Route path="/dashboard" exact component={Dashboard} />
        ) : (
          <Redirect to="/" />
        )}
        <Route render={() => <h1>404 Page Not Found</h1>} />
      </Switch>
    </Router>
  );
}

export default App;
