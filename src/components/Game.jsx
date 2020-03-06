import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "reactstrap";
import { Button } from "@material-ui/core";

class Game extends Component {
  state = {
    data: [
      [0, 0, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 2, 2]
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
    }
    console.log(options);
    console.log(this.state.data);
  };

  slideUpDown = (col, dir) => {
    let arr = col.filter(val => val !== 0);
    let difference = 4 - arr.length;
    for (let i = 0; i < difference; i++) {
      if (dir === "up") {
        arr.push(0);
      } else if (dir === "down") {
        arr.unshift(0);
      }
    }
    return arr;
  };

  slideUpDownUpdate = dir => {
    let oldData = this.state.data;
    let newData = [];
    let newRow = [];
    oldData.forEach(element => {
      newRow = this.slideUpDown(element, dir);
      this.combineUpDown(newRow, dir);

      newData.push(newRow);
    });
    console.log(newData);
    this.setState({ data: newData }, () => {
      this.addValue();
    });
  };
  combineUpDown = (col, dir) => {
    //TODO: add direction
    if (dir === "down") {
      for (let i = 3; i > 0; i--) {
        if (col[i] === col[i - 1]) {
          col[i] = col[i] + col[i - 1];
          col[i - 1] = 0;
          console.log(col);
          break;
        }
      }
    } else if (dir === "up") {
      for (let i = 0; i < 3; i++) {
        if (col[i] === col[i + 1]) {
          col[i] = col[i] + col[i + 1];
          col[i + 1] = 0;
          console.log(col);
          break;
        }
      }
    }
  };

  render() {
    const classes = {
      root: {
        flexGrow: 1,
        height: "100vh",
        display: "flex",
        "justify-content": "center",
        "align-items": "center"
      },
      paper: {
        height: 100,
        width: 100,
        margin: 0.5,
        "justify-content": "center",
        "align-items": "center"
      },
      control: {
        padding: 5
      }
    };

    return (
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
        <Button onClick={() => this.slideUpDownUpdate("down")}>Down</Button>
        <Button onClick={() => this.slideUpDownUpdate("up")}>Up</Button>
      </Container>
    );
  }
}

export default Game;
