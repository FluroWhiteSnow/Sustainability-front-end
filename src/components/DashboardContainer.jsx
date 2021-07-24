import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MetricCard from "./MetricCard";

const useStyles = makeStyles(() => ({
  paper: {
    height: 300,
    width: 500,
    backgroundColor: "#FFFFFF",
    marginTop: 30,
  },
}));

export default function DashboardContainer() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <MetricCard />
    </Paper>
  );
}
