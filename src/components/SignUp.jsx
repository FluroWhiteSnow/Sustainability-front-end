import React, { useState } from "react";
import { useAuth } from "./contexts/AuthProvider";
import Link from "@material-ui/core/Link";
import "../stylesheets/App.css";
import { Grid, InputAdornment } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import {
  PermIdentityOutlined,
  LockOpen,
  MailOutline,
} from "@material-ui/icons";

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
    const response = await fetch("http://127.0.0.1:3000/api/auth/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpForm),
    });
    const data = await response.json();
    if (data.jwt) {
      authDispatch({ type: "login", token: data.jwt, value: data });
      history.push("/dashboard");
    } else {
      setErrorMessage(data);
    }
  }

  return (
    <div>
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
            sm={3}
            alignItems="center"
            direction="column"
            justifyContent="center"
            style={{ padding: 40 }}
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
                      <PermIdentityOutlined />
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
                      <PermIdentityOutlined />
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
                      <PermIdentityOutlined />
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
                      <PermIdentityOutlined />
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
                      <PermIdentityOutlined />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                select
                label="Select"
                value={department_code}
                name="department_code"
                onChange={changeInput}
                helperText="Select your department"
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
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

// input
//         type="number"
//         placeholder="distance from work"
//         name="distance_from_work"
//         value={distance_from_work}
//         onChange={changeInput}
//       />

// {errorMessage &&
//         Object.keys(errorMessage).map((key) => (
//           <li key={key}>
//             {key}
//             {errorMessage[key][0]}
//           </li>
//         ))} <input
//         type="text"
//         placeholder="email"
//         name="email"
//         value={email}
//         onChange={changeInput}
//       />
//       <input
//         type="text"
//         placeholder="first name"
//         name="first_name"
//         value={first_name}
//         onChange={changeInput}
//       />
//       <input
//         type="text"
//         placeholder="last name"
//         name="last_name"
//         value={last_name}
//         onChange={changeInput}
//       />
//       <input
//         type="text"
//         placeholder="username"
//         name="username"
//         value={username}
//         onChange={changeInput}
//       />
//       <input
//         type="password"
//         placeholder="password"
//         name="password"
//         value={password}
//         onChange={changeInput}
//       />
//       <input
//         type="password"
//         placeholder="confirm password"
//         name="password_confirmation"
//         value={password_confirmation}
//         onChange={changeInput}
//       />
//
//       <select
//         type="text"
//         placeholder="department code"
//         name="department_code"
//         value={department_code}
//         onChange={changeInput}
//       >
//         <option value="marketing">Marketing</option>
//         <option value="sales">Sales</option>
//         <option value="operations">Operations</option>
//       </select>
//       <
//       <input type="submit" />/
