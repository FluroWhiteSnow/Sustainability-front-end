import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";

import "../stylesheets/App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route render={() => <h1>404 Page Not Found</h1>} />
      </Switch>
    </Router>
  );
}

export default App;
