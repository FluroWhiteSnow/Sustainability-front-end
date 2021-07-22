import React, { useState } from "react";
import { useAuth } from "./contexts/AuthProvider";

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
      department_code: "",
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
    <form onSubmit={handleSubmit}>
      {errorMessage &&
        Object.keys(errorMessage).map((key) => (
          <li key={key}>
            {key}
            {errorMessage[key][0]}
          </li>
        ))}
      <input
        type="text"
        placeholder="first name"
        name="first_name"
        value={first_name}
        onChange={changeInput}
      />
      <input
        type="text"
        placeholder="last name"
        name="last_name"
        value={last_name}
        onChange={changeInput}
      />
      <input
        type="text"
        placeholder="username"
        name="username"
        value={username}
        onChange={changeInput}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={password}
        onChange={changeInput}
      />
      <input
        type="password"
        placeholder="confirm password"
        name="password_confirmation"
        value={password_confirmation}
        onChange={changeInput}
      />
      <input
        type="text"
        placeholder="email"
        name="email"
        value={email}
        onChange={changeInput}
      />
      <select
        type="text"
        placeholder="department code"
        name="department_code"
        value={department_code}
        onChange={changeInput}
      >
        <option value="marketing">Marketing</option>
        <option value="sales">Sales</option>
        <option value="operations">Operations</option>
      </select>
      <input
        type="number"
        placeholder="distance from work"
        name="distance_from_work"
        value={distance_from_work}
        onChange={changeInput}
      />
      <input type="submit" />
    </form>
  );
}
