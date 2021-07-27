import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "row",
    maxHeight: "fitContent",
    width: "48%",
    marginBottom: 15,
    backgroundColor: "#F3F2C9",
    // marginTop: 30,
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
        <h1>{`${props.total} ${props.unit}`}</h1>
        <h6>{props.metricType}</h6>
      </div>
      <div className={classes.metricContainer}>{props.icon}</div>
    </Paper>
  );
}
