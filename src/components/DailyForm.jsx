import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
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
  const [userDaily, setUserDaily] = useState({});

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

  function coffeeValue(value) {
    return value;
  }

  function reusableValue(value) {
    return value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("HiHi");
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Your Daily Survey</DialogTitle>
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
            >
              <FormControlLabel
                value="Drive"
                control={<StyledRadio />}
                label="Drive"
              />
              <FormControlLabel
                value="Walk"
                control={<StyledRadio />}
                label="Walk"
              />
              <FormControlLabel
                value="Public Transport"
                control={<StyledRadio />}
                label="Public Transport"
              />
              <FormControlLabel
                value="Cycle"
                control={<StyledRadio />}
                label="Cycle"
              />
            </RadioGroup>
            <br />
            <Typography id="discrete-slider-small-steps" gutterBottom>
              How many cups of coffee have you had?
            </Typography>
            <Slider
              defaultValue={0}
              getAriaValueText={coffeeValue}
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              marks
              min={0}
              max={10}
              valueLabelDisplay="auto"
            />
            <Typography id="discrete-slider-small-steps" gutterBottom>
              How many times did you use a reusable cup?
            </Typography>
            <Slider
              defaultValue={0}
              getAriaValueText={reusableValue}
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              marks
              min={0}
              max={10}
              valueLabelDisplay="auto"
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
      </Dialog>
    </form>
  );
}
