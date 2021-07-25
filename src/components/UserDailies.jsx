import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import JSONPretty from "react-json-pretty";
import DailyForm from "./DailyForm";

const useStyles = makeStyles({
  container: {
    width: "90%",
  },
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    minWidth: "80%",
    minHeight: "5%",
  },
  title: {
    fontSize: 14,
  },
});

export default function UserDailies() {
  const [userDailies, setUserDailies] = useState([]);
  const classes = useStyles();

  const fetchData = async () => {
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const getUserDaily = await fetch(
      "http://127.0.0.1:3000/api/user_daily",
      auth
    );

    const userDaily = await getUserDaily.json();
    setUserDailies(userDaily);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = (id) => {
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    fetch(`http://127.0.0.1:3000/api/user_daily/${id}`, {
      method: "DELETE",
      auth,
    });
  };

  const editData = (id) => {
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    fetch(`http://127.0.0.1:3000/api/user_daily/${id}`, {
      method: "DELETE",
      auth,
    });
  };

  function handleClick(type, id) {
    if (type === "delete") {
      deleteData(id);
    } else {
      editData(id);
    }
  }

  return (
    <div className={classes.container}>
      <Card className={classes.root} variant="outlined">
        <Typography
          className={classes.title}
          color="textSecondary"
          component="p"
        >
          Date
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          component="p"
        >
          Transportation Type
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          component="p"
        >
          Number of Coffees
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          component="p"
        >
          Number of Reusable Cups
        </Typography>
        <div />
        <div />
      </Card>
      {userDailies.map((userDaily) => (
        <Card key={userDaily.id} className={classes.root} variant="outlined">
          <Typography variant="body2" component="p">
            {userDaily.created_at.substring(0, 10)}
          </Typography>
          <Typography variant="body2" component="p">
            {userDaily.walk && "Walk"}{" "}
            {userDaily.public_transport && "Public Transport"}{" "}
            {userDaily.drive && "Drive"}
          </Typography>
          <Typography variant="body2" component="p">
            {userDaily.coffee_cups}
          </Typography>
          <Typography variant="body2" component="p">
            {userDaily.reusable_cups}
          </Typography>
          {/* <Button
            onClick={() => handleClick("edit", userDaily.id)}
            size="small"
          >
            Edit
          </Button> */}
          <DailyForm />
          <Button
            onClick={() => handleClick("delete", userDaily.id)}
            size="small"
          >
            Delete
          </Button>
        </Card>
      ))}
    </div>
  );
}
