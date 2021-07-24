import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "row",
    maxHeight: 200,
    width: 300,
    backgroundColor: "#F3F2C9",
    marginTop: 30,
  },
  metricContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    marginLeft: "15px",
  },
}));

export default function MetricCard(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.metricContainer}>
        <h1>{`${props.total}`}</h1>
        <h6>{props.metricType}</h6>
      </div>
      <div className={classes.metricContainer}>{props.icon}</div>
    </Paper>
  );
}

// components

{
  /* <MetricCard
total={cupsTotal.reusable_cups_total}
metricType="Reusable Impact"
icon={<LocalCafeIcon style={{ width: "100px", height: "100px" }} />}
/>
<MetricCard
total={travelTotal.walk_total_km + travelTotal.pt_total_km}
metricType="Commute Impact"
icon={
  <DirectionsBikeIcon style={{ width: "100px", height: "100px" }} />
}
/>
<MetricCard
total={
  userCo2Total.walk_co2_total +
  userCo2Total.pt_co2_total +
  userCo2Total.reusable_cups_co2_total
}
metricType="CO2 Diverted"
icon={<WbCloudyIcon style={{ width: "100px", height: "100px" }} />}
/> */
}
