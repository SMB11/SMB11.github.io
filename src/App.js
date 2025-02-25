import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Game from "./components/Game";
import { Container } from "@material-ui/core";
import { classes } from "./components/styles/game";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import loginPage from "./components/loginPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={loginPage} exact />
        <Route path="/game" component={Game} exact />
      </Switch>
    </Router>
  );
}

export default App;
