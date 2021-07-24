import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
  paper: {
    height: 50,
    width: 100,
    backgroundColor: "#F3F2C9",
    marginTop: 30,
  },
}));

export default function MetricCard() {
  const classes = useStyles();
  return <Paper className={classes.paper} />;
}
