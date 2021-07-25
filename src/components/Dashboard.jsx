import { doesNotMatch } from "assert";
import React, { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";
import DashboardContainer from "./DashboardContainer";
import { makeStyles } from "@material-ui/core/styles";
import MetricCard from "./MetricCard";
import { Grid, InputAdornment } from "@material-ui/core";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import WbCloudyIcon from "@material-ui/icons/WbCloudy";
import LeaderBoard from "./LeaderBoard";

export default function Dashboard() {
  const [user, setUser] = useState([]);
  const [userDalies, setUserDalies] = useState([]);
  const [cupsTotal, setCupstotal] = useState([]);
  const [travelTotal, setTraveltotal] = useState([]);
  const [userCo2Daily, setUserCo2Daily] = useState([]);
  const [userCo2Total, setUserCo2Total] = useState([]);

  const fetchData = async () => {
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const getUser = await fetch("http://127.0.0.1:3000/api/user", auth);

    const getTravelTotal = await fetch(
      "http://127.0.0.1:3000/api/travel_total",
      auth
    );

    const getUserDaily = await fetch(
      "http://127.0.0.1:3000/api/user_daily",
      auth
    );
    const getCupsTotal = await fetch(
      "http://127.0.0.1:3000/api/cups_total",
      auth
    );
    const getUserCo2Daily = await fetch(
      "http://127.0.0.1:3000/api/user_co2_daily",
      auth
    );
    const getCo2Total = await fetch(
      "http://127.0.0.1:3000/api/user_co2_total",
      auth
    );

    const userDaily = await getUserDaily.json();
    const cupsTotal = await getCupsTotal.json();
    const travelTotal = await getTravelTotal.json();
    const userCo2Daily = await getUserCo2Daily.json();
    const co2Total = await getCo2Total.json();
    const user = await getUser.json();

    setCupstotal(cupsTotal);
    setUserDalies(userDaily);
    setTraveltotal(travelTotal);
    setUserCo2Daily(userCo2Daily);
    setUserCo2Total(co2Total);
    setUser(user);

    // await console.log(
    //   user,
    //   userDaily,
    //   // cupsTotal,
    //   // travelTotal,
    //   // userCo2Daily,
    //   userCo2Total
    // );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const useStyles = makeStyles(() => ({
    paperContainer: {
      display: "flex",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      height: "100vh",
      width: "100vw",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.paperContainer}>
      {/* <JSONPretty data={userCo2Total}></JSONPretty> */}
      <h1>Table</h1>
      <LeaderBoard
        users={user}
        userCo2Dalies={userCo2Daily}
        co2Totals={userCo2Total}
        cupsTotal={cupsTotal}
        style={{ width: 500 }}
      ></LeaderBoard>
      {/* <DashboardContainer />
      <DashboardContainer />
      <DashboardContainer />
      <DashboardContainer /> */}

      {/* <JSONPretty data={cupsTotal}></JSONPretty>
            <JSONPretty data={cupsTotal}></JSONPretty>
      <JSONPretty data={travelTotal}></JSONPretty>
      
      <JSONPretty data={userDalies}></JSONPretty>
      <JSONPretty data={userCo2Daily}></JSONPretty>

      <JSONPretty data={user}></JSONPretty> */}
    </div>
  );
}
