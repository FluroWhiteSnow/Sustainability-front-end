import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [userDalies, setUserDalies] = useState([]);

  const fetchUserDalies = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/user_daily", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    console.log(data);
    // setUserDalies(data);
  };

  useEffect(() => {
    fetchUserDalies();
  }, []);

  return (
    <div>
      <h1>Dashboard Page</h1>
      <ul>
        {userDalies.map((daily) => (
          <li key={daily.id}>{daily}</li>
        ))}
      </ul>
    </div>
  );
}
