import { doesNotMatch } from "assert";
import React, { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";
import DashboardContainer from "./DashboardContainer";
import { makeStyles } from "@material-ui/core/styles";
import MetricCard from "./MetricCard";
import UserDailies from "./UserDailies";
import DailyForm from "./DailyForm";
import { Grid, InputAdornment } from "@material-ui/core";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import WbCloudyIcon from "@material-ui/icons/WbCloudy";
import FaceIcon from "@material-ui/icons/Face";
import LeaderBoard from "./LeaderBoard";
import TreeCard from "./TreeCard";
import LineChart from "./LineChart";
import Profile from "./Profile";
import "../stylesheets/App.css";
import AddIcon from "@material-ui/icons/Add";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";

export default function Dashboard() {
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [userDailies, setUserDailies] = useState([]);

  const [cupsTotal, setCupstotal] = useState([]);
  const [travelTotal, setTraveltotal] = useState([]);
  const [userCo2Daily, setUserCo2Daily] = useState([]);
  const [userCo2Total, setUserCo2Total] = useState([]);
  const [currentUserCo2Total, setCurrentUserCo2Total] = useState([]);

  const fetchData = async () => {
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const getUser = await fetch("http://127.0.0.1:3000/api/user_all", auth);
    const getCurrentUser = await fetch("http://127.0.0.1:3000/api/user", auth);

    const getTravelTotal = await fetch(
      "http://127.0.0.1:3000/api/travel_total",
      auth
    );

    const getUserDaily = await fetch(
      "http://127.0.0.1:3000/api/user_daily",
      auth
    );
    const getCupsTotal = await fetch(
      "http://127.0.0.1:3000/api/cups_total_all",
      auth
    );
    const getUserCo2Daily = await fetch(
      "http://127.0.0.1:3000/api/user_co2_daily_all",
      auth
    );
    const getCo2Total = await fetch(
      "http://127.0.0.1:3000/api/user_co2_total_all",
      auth
    );
    const getCurrentCo2Total = await fetch(
      "http://127.0.0.1:3000/api/user_co2_total",
      auth
    );

    const userDaily = await getUserDaily.json();
    const cupsTotal = await getCupsTotal.json();
    const travelTotal = await getTravelTotal.json();
    const userCo2Daily = await getUserCo2Daily.json();
    const co2Total = await getCo2Total.json();
    const user = await getUser.json();
    const currentUser = await getCurrentUser.json();
    const currentCo2Total = await getCurrentCo2Total.json();

    setCupstotal(cupsTotal);
    setUserDailies(userDaily);
    setTraveltotal(travelTotal);
    setUserCo2Daily(userCo2Daily);
    setUserCo2Total(co2Total);
    setUser(user);
    setCurrentUser(currentUser);
    setCurrentUserCo2Total(currentCo2Total);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const useStyles = makeStyles((theme) => ({
    paperContainer: {
      display: "flex",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      height: "100vh",
      width: "100vw",
    },
    alignRight: {
      justifyContent: "right",
      padding: 0,
      marginRight: 10,
      alignSelf: "right",
    },
    moveIcon: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.paperContainer}>
      {/* <Profile icon={<FaceIcon />} user={currentUser} fetchData={fetchData} /> */}
      {/* <DailyForm buttonName="NewDaily" fetchData={fetchData} /> */}
      {/* <UserDailies userDailies={userDailies} fetchData={fetchData} />      */}
      {/* <Profile icon={<FaceIcon />} />
      <DailyForm buttonName="NewDaily" fetchData={fetchData} />
      <UserDailies userDailies={userDailies} fetchData={fetchData} /> */}
      {/* <JSONPretty data={userCo2Total}></JSONPretty> */}
      {/* <JSONPretty data={userCo2Total}></JSONPretty> */}
      {/* <LeaderBoard
        users={user}
        userCo2Dalies={userCo2Daily}
        co2Totals={userCo2Total}
        cupsTotal={cupsTotal}
        style={{ width: 500 }}
      ></LeaderBoard> */}

      {/* <div className="tree">
        <div className={classes.moveIcon}>
          <Tooltip
            title={`The more Co2 you save,\n The larger your tree grows!`}
          >
            <IconButton aria-label="delete" className={classes.alignRight}>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>

        <TreeCard co2Totals={currentUserCo2Total}></TreeCard>
      </div> */}

      {/* <LineChart
        users={user}
        userCo2Dalies={userCo2Daily}
        co2Totals={userCo2Total}
        cupsTotal={cupsTotal}
        style={{ width: 500, height: 500 }}
      ></LineChart> */}

      {/* <DashboardContainer />
      <UserDailies />
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
