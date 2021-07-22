import React, { useState } from "react";
import { useAuth } from "./contexts/AuthProvider";
import { Link } from "react-router-dom";

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
        <h1>{errorMessage}</h1>
        <input
          type="text"
          value={loginForm.username}
          onChange={changeInput}
          label="username"
          name="username"
          placeholder="username"
        />

        <input
          type="text"
          value={loginForm.email}
          onChange={changeInput}
          name="email"
          placeholder="email"
        />

        <input
          type="text"
          value={loginForm.password}
          onChange={changeInput}
          name="password"
          placeholder="password"
        />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
