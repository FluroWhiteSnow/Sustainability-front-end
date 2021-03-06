import React, { useState } from "react";
import { useAuth } from "./contexts/AuthProvider";
import Link from "@material-ui/core/Link";
import "../stylesheets/App.css";
import { Grid, InputAdornment } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  PermIdentityOutlined,
  LockOpen,
  MailOutline,
} from "@material-ui/icons";

const theme = createTheme({
  typography: {
    SignUp: {
      fontSize: 2,
      color: "#FFFFFF",
    },
  },
});

export default function Login({ history }) {
  const [errorMessage, setErrorMessage] = useState("");

  const { authDispatch } = useAuth();

  const [loginForm, setLoginForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeInput = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const sendLoginRequest = async () => {
    const response = await fetch(
      "https://sustainability-app.herokuapp.com/api/auth/sign_in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      }
    );
    const data = await response.json();
    if (data.jwt) {
      authDispatch({
        type: "login",
        token: data.jwt,
        value: data,
      });
      history.push("/dashboard");
    } else {
      console.log("error");
      setErrorMessage(data.error);
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();
    sendLoginRequest();
  };

  return (
    <div className="testing">
      <form noValidate onSubmit={submitLogin}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid
            container
            className="container"
            item
            xs={12}
            alignItems="center"
            direction="column"
            justifyContent="center"
            style={{ padding: 5, maxWidth: 430 }}
          >
            <div />
            <div
              className="mainCard"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",

                maxWidth: 350,
                minWidth: 300,
                minHeight: 530,
              }}
            >
              <Grid container justifyContent="center">
                <Typography component="h1" variant="h4">
                  Sign in
                </Typography>
              </Grid>

              <div style={{ height: 20, marginBottom: 20 }} />
              {errorMessage ? (
                <Alert
                  severity="error"
                  style={{ marginTop: -20, marginBottom: 15 }}
                >
                  {errorMessage}
                </Alert>
              ) : (
                <></>
              )}
              <TextField
                label="Username"
                margin="normal"
                value={loginForm.username}
                onChange={changeInput}
                name="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityOutlined />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                label="Email"
                margin="normal"
                value={loginForm.email}
                onChange={changeInput}
                name="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutline />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                label="Password"
                margin="normal"
                type="Password"
                value={loginForm.password}
                onChange={changeInput}
                name="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpen />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <div style={{ height: 20 }} />
              <Button
                type="submit"
                className="LogIn-SignUp-Button"
                variant="contained"
              >
                Log In
              </Button>
              <div style={{ height: 20 }} />
              <ThemeProvider theme={theme}>
                <Typography variant="SignUp" align="center">
                  Dont have an account?{" "}
                  <Link
                    href="/sign-up"
                    onClick={changeInput}
                    variant="SignUp"
                    className="Sign-Up-Log-In-Link"
                  >
                    Sign Up
                  </Link>
                </Typography>
              </ThemeProvider>
            </div>
            <div />
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
