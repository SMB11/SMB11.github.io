import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { Container, Row, Col } from "reactstrap";
import { classes } from "./styles/game";
import { rotate, combineUpDown, slideUpDown, checkGame } from "./helpers/game";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { auth } from "./configs/firebase_config";
import { Button } from "@material-ui/core";
import { signOut } from "./helpers/loginHelper";
import Typography from "material-ui/styles/typography";

class Game extends Component {
  state = {
    data: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 0]
    ],
    score: 0
  };
  isLoggedIn() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push("/");
      }
    });
  }
  componentDidMount() {
    this.isLoggedIn();
  }
  addValue = () => {
    let options = [];
    let newData = this.state.data;
    this.updateScore();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.state.data[i][j] === 0) {
          options.push({ x: i, y: j });
        }
      }
    }
    if (options.length > 0) {
      let randomNum = Math.floor(Math.random() * options.length);
      let randomElement = options[randomNum];
      newData[randomElement.x][randomElement.y] = randomNum > 2 ? 2 : 4;
      this.setState({ data: newData });
    } else if (options.length === 0) {
      alert("No more moves");
      //TODO:add to db
    }
    if (checkGame(this.state.data)) {
      alert("You win");
    }
    // console.log(options);
    // console.log(this.state.data);
  };

  slideUpDownUpdate = (data, dir) => {
    let oldData = data;
    let newData = [];
    let newRow = [];
    oldData.forEach(element => {
      newRow = slideUpDown(element, dir);
      combineUpDown(newRow, dir);

      newData.push(newRow);
    });
    console.log(newData);
    this.setState({ data: newData }, () => {
      this.addValue();
    });
  };

  slideLeftRightUpdate = (data, dir) => {
    let oldData = data;
    let rotatedData = rotate(oldData);
    let newData = [];
    let newRow = [];
    let finalData = [];

    rotatedData.forEach(element => {
      newRow = slideUpDown(element, dir);
      combineUpDown(newRow, dir);

      newData.push(newRow);
    });
    console.log(newData);
    finalData = rotate(newData);
    finalData = rotate(newData);
    finalData = rotate(newData);

    this.setState({ data: finalData }, () => {
      console.log(finalData);
      this.addValue();
    });
  };

  updateScore = () => {
    let score = 0;
    let data = this.state.data;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        score = score + data[i][j];
      }
    }
    this.setState({ score });
  };
  handleEvents = key => {
    // console.log(typeof key);
    switch (key) {
      case "up":
        return this.slideUpDownUpdate(this.state.data, "up");

      case "down":
        return this.slideUpDownUpdate(this.state.data, "down");
      case "left":
        return this.slideLeftRightUpdate(this.state.data, "down");
      case "right":
        return this.slideLeftRightUpdate(this.state.data, "up");
      default:
        return null;
    }
  };

  render() {
    return (
      <Container>
        <KeyboardEventHandler
          handleKeys={["up", "down", "left", "right"]}
          onKeyEvent={(key, e) => this.handleEvents(key)}
        />
        <p style={classes.header} align="center">
          2048 Game Smbat Gardilyan
        </p>
        <Row>
          <Col>
            <p align="right" style={classes.score}>
              Score: {this.state.score}
            </p>
          </Col>
          <Col>
            <p align="right" style={classes.score}>
              <Button onClick={signOut}>Sign Out</Button>
            </p>
          </Col>
        </Row>
        <Container style={classes.root}>
          {this.state.data.map(col => (
            <Row>
              {col.map(row => (
                <Col>
                  <Paper style={classes.paper}>
                    <h1>{row}</h1>
                  </Paper>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      </Container>
    );
  }
}

export default Game;
