import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { Container, Row, Col } from "reactstrap";
import { Button } from "@material-ui/core";
import { classes } from "./styles/game";
import { rotate, combineUpDown, slideUpDown, checkGame } from "./helpers/game";
class Game extends Component {
  state = {
    data: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 0]
    ]
  };
  addValue = () => {
    let options = [];
    let newData = this.state.data;
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
      newData[randomElement.x][randomElement.y] = randomNum > 2 ? 2 : 4; //TODO: or 4
      this.setState({ data: newData });
    } else if (options.length === 0) {
      alert("No more moves");
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

  render() {
    return (
      <Container>
        <p style={classes.header} align="center">
          2048 Game Smbat Gardilyan
        </p>
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
          <Button
            onClick={() => this.slideLeftRightUpdate(this.state.data, "down")}
          >
            Left
          </Button>
          <Row>
            <Col>
              <Button
                onClick={() => this.slideUpDownUpdate(this.state.data, "up")}
              >
                Up
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => this.slideUpDownUpdate(this.state.data, "down")}
              >
                Down
              </Button>
            </Col>
          </Row>
          <Button
            onClick={() => this.slideLeftRightUpdate(this.state.data, "up")}
          >
            Right
          </Button>
        </Container>
      </Container>
    );
  }
}

export default Game;
