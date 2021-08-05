import React, { useState } from "react";
import { useAuth } from "./contexts/AuthProvider";
import Link from "@material-ui/core/Link";
import "../stylesheets/App.css";
import { Grid, InputAdornment } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import {
  PermIdentityOutlined,
  LockOpen,
  MailOutline,
} from "@material-ui/icons";

const theme = createTheme({
  typography: {
    LogIn: {
      fontSize: 2,
      color: "#FFFFFF",
    },
  },
});

const departments = [
  {
    value: "Finance",
    label: "Finance",
  },
  {
    value: "Accounting",
    label: "Accounting",
  },
  {
    value: "IT",
    label: "IT",
  },
];

export default function SignUp({ history }) {
  const { authDispatch } = useAuth();

  const [signUpForm, setSignUpForm] = useState({
    user: {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      password_confirmation: "",
      email: "",
      department_code: "Accounting",
      distance_from_work: "",
      admin: false,
    },
  });
  const [errorMessage, setErrorMessage] = useState("");

  const {
    first_name,
    last_name,
    username,
    password,
    password_confirmation,
    email,
    department_code,
    distance_from_work,
  } = signUpForm.user;

  function changeInput(e) {
    setSignUpForm({
      user: {
        ...signUpForm.user,
        [e.target.name]: e.target.value,
      },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSignUpForm({
      user: {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
        department_code: "",
        distance_from_work: "",
        admin: false,
      },
    });
    postSignUp();
  }

  async function postSignUp() {
    const response = await fetch(
      "https://sustainability-app.herokuapp.com/api/auth/sign_up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpForm),
      }
    );
    const data = await response.json();
    if (data.jwt) {
      authDispatch({ type: "login", token: data.jwt, value: data });
      history.push("/dashboard");
    } else {
      setErrorMessage(data);
    }
  }

  return (
    <div className="testing">
      <div className="rectangle-right"></div>
      <form onSubmit={handleSubmit}>
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
            style={{ padding: 40, maxWidth: 500 }}
          >
            <div />
            <div
              className="mainCard"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",

                maxWidth: 350,
                minWidth: 330,
                minHeight: 580,
              }}
            >
              <Grid container justifyContent="center">
                <Typography component="h1" variant="h4">
                  Sign Up
                </Typography>
              </Grid>

              <div style={{ height: 30 }} />
              <TextField
                label="First Name"
                margin="normal"
                value={first_name}
                onChange={changeInput}
                name="first_name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityOutlined />
                    </InputAdornment>
                  ),
                }}
              ></TextField>

              <TextField
                label="Last Name"
                margin="normal"
                value={last_name}
                onChange={changeInput}
                name="last_name"
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
                value={email}
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
                label="Username"
                margin="normal"
                value={username}
                onChange={changeInput}
                name="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                type="password"
                label="Password"
                margin="normal"
                value={password}
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
              <TextField
                type="password"
                label="Confirm Password"
                margin="normal"
                value={password_confirmation}
                onChange={changeInput}
                name="password_confirmation"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpen />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                label="Distance from Work (km)"
                margin="normal"
                value={distance_from_work}
                onChange={changeInput}
                name="distance_from_work"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PinDropOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                select
                margin="normal"
                label="Select your department"
                value={department_code}
                name="department_code"
                onChange={changeInput}
              >
                {departments.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <div style={{ height: 20 }} />
              <Button
                type="submit"
                className="LogIn-SignUp-Button"
                variant="contained"
              >
                Sign Up
              </Button>
              <div style={{ height: 20 }} />
              <ThemeProvider theme={theme}>
                <Typography variant="SignUp" align="center">
                  Already have an account?{" "}
                  <Link
                    variant="LogIn"
                    href="/"
                    onClick={changeInput}
                    className="Sign-Up-Log-In-Link"
                  >
                    Log In
                  </Link>
                </Typography>
              </ThemeProvider>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
