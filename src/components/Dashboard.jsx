import React, { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";

export default function Dashboard() {
  const [userDalies, setUserDalies] = useState([]);

  const fetchUserDalies = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/user_daily", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    // console.log(data);
    setUserDalies(data);
    await console.log(userDalies);
  };

  useEffect(() => {
    fetchUserDalies();
  }, []);

  return (
    <div>
      <h1>Dashboard Page</h1>
      <JSONPretty data={userDalies}></JSONPretty>
    </div>
  );
}
