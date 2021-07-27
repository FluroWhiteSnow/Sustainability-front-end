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
import "../stylesheets/dashboard.css";
import AddIcon from "@material-ui/icons/Add";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";

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

    const getUser = await fetch("http://127.0.0.1:3000/api/user_all", auth);
    const getCurrentUser = await fetch("http://127.0.0.1:3000/api/user", auth);

    const getUserDaily = await fetch(
      "http://127.0.0.1:3000/api/user_daily",
      auth
    );
    //All User Total and Daily API calls
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
    //Current User Total and Daily API calls
    const getCurrentCo2Total = await fetch(
      "http://127.0.0.1:3000/api/user_co2_total",
      auth
    );
    const getCurrentCupsTotal = await fetch(
      "http://127.0.0.1:3000/api/cups_total",
      auth
    );
    const getCurrentTravelTotal = await fetch(
      "http://127.0.0.1:3000/api/travel_total",
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
      <React.Fragment>
        <nav>
          <Profile
            icon={<FaceIcon />}
            user={currentUser}
            fetchData={fetchData}
          />
        </nav>
        <main>
          <section id="section-one">
            <article class="card-container">
              <LeaderBoard
                users={user}
                userCo2Dalies={userCo2Daily}
                co2Totals={userCo2Total}
                cupsTotal={cupsTotal}
              ></LeaderBoard>
            </article>
            <article class="card-container metric-card">
              <MetricCard
                unit="cups"
                total={currentCupsTotal.reusable_cups_total}
                metricType="Reusable Impact"
                icon={
                  <LocalCafeIcon style={{ width: "50px", height: "50px" }} />
                }
              />
              <MetricCard
                unit="kms"
                total={
                  currentTravelTotal.walk_total_km +
                  currentTravelTotal.pt_total_km
                }
                metricType="Commute Impact"
                icon={
                  <DirectionsBikeIcon
                    style={{ width: "50px", height: "50px" }}
                  />
                }
              />
              <MetricCard
                unit="g"
                total={
                  currentUserCo2Total.walk_co2_total +
                  currentUserCo2Total.pt_co2_total +
                  currentUserCo2Total.reusable_cups_co2_total
                }
                metricType="CO2 Diverted"
                icon={
                  <WbCloudyIcon style={{ width: "50px", height: "50px" }} />
                }
              />
              <MetricCard
                unit="days"
                total={userDailies.length}
                metricType="Total CO2 Offset Days"
                icon={
                  <WbCloudyIcon style={{ width: "50px", height: "50px" }} />
                }
              />
            </article>
            <article class="card-container card-container-line-chart">
              <LineChart
                users={user}
                userCo2Dalies={userCo2Daily}
                co2Totals={userCo2Total}
                cupsTotal={cupsTotal}
                style={{ width: "100%", height: "100%" }}
              ></LineChart>
            </article>
            <article class="card-container ">
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
          <section id="section-two">
            <article class="card-container bottom">
              <UserDailies userDailies={userDailies} fetchData={fetchData} />
            </article>
          </section>
        </main>
      </React.Fragment>
      {/* <div className="tree">

    <React.Fragment>
      <nav>
        <Profile icon={<FaceIcon />} user={currentUser} fetchData={fetchData} />
      </nav>
      <main>
        <section id="section-one">
          <article class="card-container"></article>
          <article class="card-container metric-card">
            <MetricCard
              unit="cups"
              total={currentCupsTotal.reusable_cups_total}
              metricType="Reusable Impact"
              icon={<LocalCafeIcon style={{ width: "50px", height: "50px" }} />}
            />
            <MetricCard
              unit="kms"
              total={
                currentTravelTotal.walk_total_km +
                currentTravelTotal.pt_total_km
              }
              metricType="Commute Impact"
              icon={
                <DirectionsBikeIcon style={{ width: "50px", height: "50px" }} />
              }
            />
            <MetricCard
              unit="g"
              total={
                currentUserCo2Total.walk_co2_total +
                currentUserCo2Total.pt_co2_total +
                currentUserCo2Total.reusable_cups_co2_total
              }
              metricType="CO2 Diverted"
              icon={<WbCloudyIcon style={{ width: "50px", height: "50px" }} />}
            />
            <MetricCard
              unit="days"
              total={userDailies.length}
              metricType="Total CO2 Offset Days"
              icon={<WbCloudyIcon style={{ width: "50px", height: "50px" }} />}
            />
          </article>
          <article class="card-container"></article>
          <article class="card-container"></article>
        </section>
        <section id="section-two">
          <article class="card-container bottom"></article>
        </section>
      </main>
    </React.Fragment>
  );

  {
    /* <Profile icon={<FaceIcon />} user={currentUser} fetchData={fetchData} /> */
  }
  {
    /* <DailyForm buttonName="NewDaily" fetchData={fetchData} /> */
  }
  {
    /* <UserDailies userDailies={userDailies} fetchData={fetchData} />      */
  }
  {
    /* <Profile icon={<FaceIcon />} />
      <DailyForm buttonName="NewDaily" fetchData={fetchData} />
      <UserDailies userDailies={userDailies} fetchData={fetchData} /> */
  }
  {
    /* <JSONPretty data={userCo2Total}></JSONPretty> */
  }
  {
    /* <JSONPretty data={userCo2Total}></JSONPretty> */
  }
  {
    /* <LeaderBoard
        users={user}
        userCo2Dalies={userCo2Daily}
        co2Totals={userCo2Total}
        cupsTotal={cupsTotal}
        style={{ width: 500 }}
      ></LeaderBoard> */
  }

  // tree
  {
    /* <div className="tree">
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
      </div>

      {/* <LineChart
// line chart
      <LineChart
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

// leaderboard

/* <LeaderBoard
        users={user}
        userCo2Dalies={userCo2Daily}
        co2Totals={userCo2Total}
        cupsTotal={cupsTotal}
        style={{ width: 500 }}
      ></LeaderBoard> */

/* <DailyForm buttonName="NewDaily" fetchData={fetchData} /> */

/* <UserDailies userDailies={userDailies} fetchData={fetchData} />      */

/* <Profile icon={<FaceIcon />} />
      <DailyForm buttonName="NewDaily" fetchData={fetchData} />
      <UserDailies userDailies={userDailies} fetchData={fetchData} /> */

// metric card

  }

  {
    /* <DashboardContainer />
      <UserDailies />
      <DashboardContainer />
      <DashboardContainer />
      <DashboardContainer /> */
  }

  {
    /* <LeaderBoard
       users={user}
      userCo2Dalies={userCo2Daily}
      co2Totals={userCo2Total}
       cupsTotal={cupsTotal}
       style={{ width: 500 }}
     ></LeaderBoard>  */
  }

  // {
  //   /* <DailyForm buttonName="NewDaily" fetchData={fetchData} /> */
  // }
  // {
  /* <UserDailies userDailies={userDailies} fetchData={fetchData} />      */
  // }
  // {
  //   /* <Profile icon={<FaceIcon />} />
  //       <DailyForm buttonName="NewDaily" fetchData={fetchData} />
  //       <UserDailies userDailies={userDailies} fetchData={fetchData} /> */
  // }

  // metric card
}

