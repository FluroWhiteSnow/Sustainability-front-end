import { doesNotMatch } from "assert";
import React, { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";
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
import "../stylesheets/dashboard.css";
import AddIcon from "@material-ui/icons/Add";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import FilterDramaIcon from "@material-ui/icons/FilterDrama";
import LocalCafeOutlinedIcon from "@material-ui/icons/LocalCafeOutlined";

export default function Dashboard() {
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  // All User Totals and Dailies
  const [userDailies, setUserDailies] = useState([]);
  const [cupsTotal, setCupstotal] = useState([]);
  const [travelTotal, setTraveltotal] = useState([]);
  const [userCo2Daily, setUserCo2Daily] = useState([]);
  const [userCo2Total, setUserCo2Total] = useState([]);

  // Current User Totals and Dailies
  const [currentUserCo2Total, setCurrentUserCo2Total] = useState({});
  const [currentCupsTotal, setCurrentCupsTotal] = useState({});
  const [currentTravelTotal, setCurrentTraveltotal] = useState({});
  const [currentUserCo2Daily, setCurrentUserCo2Daily] = useState({});

  const fetchData = async () => {
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const getUser = await fetch(
      "http://sustainability-app.herokuapp.com/api/user_all",
      auth
    );
    const getCurrentUser = await fetch(
      "http://sustainability-app.herokuapp.com//api/user",
      auth
    );

    const getUserDaily = await fetch(
      "http://sustainability-app.herokuapp.com/api/user_daily",
      auth
    );
    //All User Total and Daily API calls
    const getCupsTotal = await fetch(
      "http://sustainability-app.herokuapp.com/api/cups_total_all",
      auth
    );
    const getUserCo2Daily = await fetch(
      "http://sustainability-app.herokuapp.com/api/user_co2_daily_all",
      auth
    );
    const getCo2Total = await fetch(
      "http://sustainability-app.herokuapp.com/api/user_co2_total_all",
      auth
    );
    //Current User Total and Daily API calls
    const getCurrentCo2Total = await fetch(
      "http://sustainability-app.herokuapp.com/api/user_co2_total",
      auth
    );
    const getCurrentCupsTotal = await fetch(
      "http://sustainability-app.herokuapp.com/api/cups_total",
      auth
    );
    const getCurrentTravelTotal = await fetch(
      "http://sustainability-app.herokuapp.com/api/travel_total",
      auth
    );
    //All Users
    const user = await getUser.json();
    const userDaily = await getUserDaily.json();
    const cupsTotal = await getCupsTotal.json();
    const userCo2Daily = await getUserCo2Daily.json();
    const co2Total = await getCo2Total.json();

    setCupstotal(cupsTotal);
    setUserDailies(userDaily);
    setUserCo2Daily(userCo2Daily);
    setUserCo2Total(co2Total);
    setUser(user);

    // Current User
    const currentUser = await getCurrentUser.json();
    const currentCo2Total = await getCurrentCo2Total.json();
    const currentCupsTotal = await getCurrentCupsTotal.json();
    const currentTravelTotal = await getCurrentTravelTotal.json();

    setCurrentUser(currentUser);
    setCurrentUserCo2Total(currentCo2Total);
    setCurrentCupsTotal(currentCupsTotal);
    setCurrentTraveltotal(currentTravelTotal);
    await console.log(userCo2Daily, userCo2Total, user, cupsTotal);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const useStyles = makeStyles((theme) => ({
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
    <React.Fragment>
      <div className="background">
        <nav className="nav-bar">
          <div className="nav-container">
            <DailyForm
              className="new-user-daily"
              buttonName="newDaily"
              buttonDisplay="New Contribution"
              fetchData={fetchData}
            />
            <Profile
              icon={<FaceIcon />}
              user={currentUser}
              fetchData={fetchData}
            />
          </div>
        </nav>
        <main>
          <div className="top-section-conatiner">
            <section id="section-one">
              <article class="card-container tops">
                <LeaderBoard
                  users={user}
                  userCo2Dalies={userCo2Daily}
                  co2Totals={userCo2Total}
                  cupsTotal={cupsTotal}
                ></LeaderBoard>
              </article>
              <article class="card-container metric-card tops">
                <MetricCard
                  unit="cups"
                  total={currentCupsTotal.reusable_cups_total}
                  metricType="Reusable Impact"
                  color="linear-gradient(315deg, #7cffcb 0%, #74f2ce 74%)"
                  icon={
                    <LocalCafeOutlinedIcon
                      style={{ width: "50px", height: "50px" }}
                    />
                  }
                />
                <MetricCard
                  unit="kms"
                  total={
                    currentTravelTotal.walk_total_km +
                    currentTravelTotal.pt_total_km
                  }
                  metricType="Commute Impact"
                  color="linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)"
                  icon={
                    <DirectionsBikeIcon
                      style={{ width: "50px", height: "50px" }}
                    />
                  }
                  // background-image: linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%);
                />
                <MetricCard
                  unit="g"
                  total={
                    currentUserCo2Total.walk_co2_total +
                    currentUserCo2Total.pt_co2_total +
                    currentUserCo2Total.reusable_cups_co2_total
                  }
                  color=" linear-gradient(60deg, #96deda 0%, #50c9c3
                100%)"
                  metricType="CO2 Diverted"
                  icon={
                    <FilterDramaIcon
                      style={{ width: "50px", height: "50px" }}
                    />
                  }
                />
                <MetricCard
                  unit="days"
                  total={userDailies.length}
                  metricType="Total CO2 Offset Days"
                  color="linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)"
                  icon={
                    <FilterDramaIcon
                      style={{ width: "50px", height: "50px" }}
                    />
                  }
                />
              </article>
              <article class="card-container card-container-line-chart tops">
                <LineChart
                  users={user}
                  userCo2Dalies={userCo2Daily}
                  co2Totals={userCo2Total}
                  cupsTotal={cupsTotal}
                  style={{ width: "100%", height: "100%" }}
                ></LineChart>
              </article>
              <article class="card-container tops">
                <div className="tree">
                  <div className={classes.moveIcon}>
                    <Tooltip
                      title={`The more Co2 you save,\n The larger your tree grows!`}
                    >
                      <IconButton
                        aria-label="delete"
                        className={classes.alignRight}
                      >
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </div>

                  <TreeCard co2Totals={currentUserCo2Total}></TreeCard>
                </div>
              </article>
            </section>
          </div>

          <section id="section-two">
            <article class="card-container bottom">
              <UserDailies userDailies={userDailies} fetchData={fetchData} />
            </article>
          </section>
        </main>
      </div>
    </React.Fragment>
  );
}
