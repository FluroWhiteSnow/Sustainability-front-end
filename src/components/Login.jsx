import React, { useState } from "react";
import { useAuth } from "./contexts/AuthProvider";
import { Link } from "react-router-dom";
import "../stylesheets/App.css";
import { Grid, InputAdornment } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  PermIdentityOutlined,
  LockOpen,
  MailOutline,
  ArrowRightTwoTone,
} from "@material-ui/icons";

const theme = createTheme({
  typography: {
    SignUpLink: {
      fontSize: 2,
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
        <Grid container style={{ minHeight: "100vh" }}>
          <Grid
            container
            item
            xs={12}
            sm={6}
            alignItems="center"
            direction="column"
            justifyContent="space-between"
            style={{ padding: 10 }}
          >
            <div />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 400,
                minWidth: 300,
              }}
            >
              <Grid container justifyContent="center">
                <Typography component="h1" variant="h4">
                  Sign in
                </Typography>
              </Grid>
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
              <Button type="submit" color="primary" variant="contained">
                Log In
              </Button>
              <div style={{ height: 20 }} />
              <ThemeProvider theme={theme}>
                <Typography variant="SignUpLink" align="right">
                  Dont have an account? Sign Up
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
