import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
});

export default function DailyForm(props) {
  const [open, setOpen] = useState(false);
  const initialState = props.userDaily || {
    walk: false,
    drive: false,
    public_transport: false,
    coffee_cups: 0,
    reusable_cups: 0,
  };
  const [userDaily, setUserDaily] = useState(initialState);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function StyledRadio(props) {
    const classes = useStyles();

    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

  function transportType() {
    if (userDaily.drive) {
      return "drive";
    } else if (userDaily.walk) {
      return "walk";
    } else if (userDaily.public_transport) {
      return "public_transport";
    }
  }

  function handleTransportChange(e) {
    setUserDaily({
      ...userDaily,
      drive: false,
      public_transport: false,
      walk: false,
      [e.target.value]: true,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = {
      user_daily: {
        ...userDaily,
        coffee_cups: parseInt(formData.get("coffee_slider")),
        reusable_cups: parseInt(formData.get("reusable_slider")),
      },
    };
    if (props.buttonName === "Edit") {
      await fetch(
        `http://127.0.0.1:3000/api/user_daily/${props.userDaily.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );
    } else {
      await fetch("http://127.0.0.1:3000/api/user_daily/", {
        method: "Post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
    }
    props.fetchData();
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{
          backgroundColor: "white",
          color: "#404040",
        }}
        onClick={handleClickOpen}
      >
        {props.buttonDisplay}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <DialogTitle style={{ padding: "20px" }} id="form-dialog-title">
            Your Daily Survey
          </DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                How did you travel to the office?
              </FormLabel>
              <br />
              <RadioGroup
                defaultValue="drive"
                aria-label="transport_type"
                name="customized-radios"
                value={transportType()}
                onChange={handleTransportChange}
              >
                <FormControlLabel
                  value="drive"
                  control={<StyledRadio />}
                  label="Drive"
                />
                <FormControlLabel
                  value="walk"
                  control={<StyledRadio />}
                  label="Walk or Cycle"
                />
                <FormControlLabel
                  value="public_transport"
                  control={<StyledRadio />}
                  label="Public Transport"
                />
              </RadioGroup>
              <br />
              <Typography id="discrete-slider-small-steps" gutterBottom>
                How many cups of coffee have you had?
              </Typography>
              <Slider
                defaultValue={userDaily.coffee_cups || 1}
                aria-labelledby="discrete-slider"
                step={1}
                min={0}
                max={20}
                valueLabelDisplay="auto"
                name="coffee_slider"
              />
              <Typography id="discrete-slider-small-steps" gutterBottom>
                How many times did you use a reusable cup?
              </Typography>
              <Slider
                defaultValue={userDaily.reusable_cups || 1}
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                min={0}
                max={20}
                valueLabelDisplay="auto"
                name="reusable_slider"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
