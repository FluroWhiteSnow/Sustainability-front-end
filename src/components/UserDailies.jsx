import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DailyForm from "./DailyForm";
import "../stylesheets/App.css";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import book from "./assets/book.svg";
import bike from "./assets/bike.svg";
import coffee from "./assets/coffee.svg";
import cross from "./assets/cross.svg";
import pencil from "./assets/pencil.svg";
import greenCoffee from "./assets/green-coffee.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "fit-content",
  },
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    minWidth: "100%",
    minHeight: "fit-content",
    paddingLeft: 20,
  },
  title: {
    fontSize: 14,
    width: "fitContent",
  },
}));

export default function UserDailies(props) {
  const classes = useStyles();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 650;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  const deleteData = async (id) => {
    await fetch(
      `https://sustainability-app.herokuapp.com/api/user_daily/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    props.fetchData();
  };

  const editData = (id) => {
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    fetch(`https://sustainability-app.herokuapp.com/api/user_daily/${id}`, {
      method: "PUT",
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
        <div className="main-wrap">
          <div className="cell cell-one icons">
            <img
              className="daily-icon"
              src={book}
              alt="book"
              style={{ height: "25px" }}
            />
            <div className="daily-headings">
              <Typography
                className={classes.title}
                color="textSecondary"
                component="p"
              >
                Date
              </Typography>
            </div>
          </div>

          <div className="cell icons">
            <img
              className="daily-icon"
              src={bike}
              alt="book"
              style={{ height: "30px" }}
            />
            <div className="daily-headings">
              <Typography
                className={classes.title}
                color="textSecondary"
                component="p"
              >
                Transportation Type
              </Typography>
            </div>
          </div>
          <div className="cell icons">
            <img
              className="daily-icon"
              src={coffee}
              alt="book"
              style={{ height: "23px" }}
            />
            <div className="daily-headings">
              <Typography
                className={classes.title}
                color="textSecondary"
                component="p"
              >
                Number of Coffees
              </Typography>
            </div>
          </div>
          <div className="cell icons">
            <img
              className="daily-icon"
              src={greenCoffee}
              alt="book"
              style={{ height: "23px" }}
            />
            <div className="daily-headings">
              <Typography
                className={classes.title}
                color="textSecondary"
                component="p"
              >
                Number of Reusable Cups
              </Typography>
            </div>
          </div>
        </div>
      </Card>

      {props.userDailies &&
        props.userDailies
          .sort((a, b) => b.id - a.id)
          .slice(0, 3)
          .map((userDaily) => (
            <Card
              key={userDaily.id}
              className={classes.root}
              variant="outlined"
            >
              <div className="main-wrap">
                <div className="cell">
                  <Typography variant="body2" component="p">
                    {userDaily.created_at.substring(0, 10)}
                  </Typography>
                </div>
                <div className="cell">
                  <Typography variant="body2" component="p">
                    {userDaily.walk && "Walk"}{" "}
                    {userDaily.public_transport && "Public Transport"}{" "}
                    {userDaily.drive && "Drive"}
                  </Typography>
                </div>
                <div className="cell">
                  <Typography variant="body2" component="p">
                    {userDaily.coffee_cups}
                  </Typography>
                </div>
                <div className="cell">
                  <Typography variant="body2" component="p">
                    {userDaily.reusable_cups}
                  </Typography>
                </div>
              </div>
              <div className={isMobile ? "cell" : "button-cell"}>
                <DailyForm
                  buttonName="Edit"
                  buttonDisplay={<DoneIcon />}
                  userDaily={userDaily}
                  fetchData={props.fetchData}
                />
                <Button
                  onClick={() => handleClick("delete", userDaily.id)}
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  <CloseIcon />
                </Button>
              </div>
            </Card>
          ))}
    </div>
  );
}
