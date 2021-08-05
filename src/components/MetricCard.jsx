import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "row",
    maxHeight: "fitContent",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 10,
    },
    [theme.breakpoints.up("sm")]: {
      width: "48%",
    },
    // width: "48%",
    marginBottom: 15,
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
    <Paper
      className={classes.paper}
      style={{ background: props.color, filter: props.filter }}
    >
      <div className={classes.metricContainer}>
        <h1>{`${props.total} ${props.unit}`}</h1>
        <h6>{props.metricType}</h6>
      </div>
      <div className={classes.metricContainer}>{props.icon}</div>
    </Paper>
  );
}
