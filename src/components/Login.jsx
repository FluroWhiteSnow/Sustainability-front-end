import React, { useState } from "react";
import { useAuth } from "./contexts/AuthProvider";
// import { Link } from "react-router-dom";

import Link from "@material-ui/core/Link";

import "../stylesheets/App.css";
import { Grid, InputAdornment } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
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
    const response = await fetch("http://127.0.0.1:3000/api/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    });
    const data = await response.json();
    if (data.jwt) {
      await console.log(data);
      authDispatch({ type: "login", token: data.jwt, value: data });
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
    <div>
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
            sm={3}
            alignItems="center"
            direction="column"
            justifyContent="center"
            style={{ padding: 10 }}
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
                minHeight: 580,
              }}
            >
              <Grid container justifyContent="center">
                <Typography component="h1" variant="h4">
                  Sign in
                </Typography>
              </Grid>
              <div style={{ height: 30 }} />
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
                <Typography variant="SignUp" align="right">
                  Dont have an account?{" "}
                  <Link variant="SignUp" to="/sign-up" className="Sign-Up-Link">
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

// <form noValidate onSubmit={submitLogin}>
//         <h1>{errorMessage}</h1>
//         <input
//           type="text"
//           value={loginForm.username}
//           onChange={changeInput}
//           label="username"
//           name="username"
//           placeholder="username"
//         />

//         <input
//           type="text"
//           value={loginForm.email}
//           onChange={changeInput}
//           name="email"
//           placeholder="email"
//         />

//         <input
//           type="text"
//           value={loginForm.password}
//           onChange={changeInput}
//           name="password"
//           placeholder="password"
//         />

//         <button type="submit">Log In</button>
//       </form>
