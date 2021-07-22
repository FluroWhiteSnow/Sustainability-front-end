import React, { useState } from "react";
import { useAuth } from "./contexts/AuthProvider";

export default function SignUp() {
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
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(signUpForm);
  }

  return (
    <form>
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
        name="password"
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
