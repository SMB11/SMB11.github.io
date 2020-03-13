import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { loginHandler } from "./helpers/loginHelper";
import { auth } from "./configs/firebase_config";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      toDashBoard: false,
      user: false
    };
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(evt) {
    if (!this.state.email) {
      this.setState({ error: "Email is required" });
      alert(this.state.error);
    }
    if (!this.state.password) {
      this.setState({ error: "Password is required" });
      alert(this.state.error);
    }
    this.loginHandler(this.state.email, this.state.password);
  }

  handleEmailChange(evt) {
    this.setState({
      email: evt.target.value
    });
  }

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  loginHandler = (email, password) => {
    var mode = !this.state.user ? "signIn" : "signUp";
    loginHandler(email, password, mode);
  };
  loginModeHandler = () => {
    if (this.state.user) {
      this.setState({ user: false });
    } else {
      this.setState({ user: true });
    }
  };

  isLoggedIn() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.history.push("/game");
      }
    });
  }
  componentDidMount() {
    this.isLoggedIn();
  }

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handlePassChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              {this.state.user ? "Sign up" : "Sign in"}
            </Button>
            <Button onClick={this.loginModeHandler}>
              <Typography>
                Change to {this.state.user ? "Sign in" : "Sign up"}
              </Typography>
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(LoginPage);
