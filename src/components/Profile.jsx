import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useHistory } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";
import "./../stylesheets/profile.css";

export default function Profile(props) {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { authDispatch } = useAuth();

  const handleSignOut = () => {
    authDispatch({
      type: "sign-out",
    });
    history.push("/");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = {
      user: {
        ...props.user,
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        distance_from_work: formData.get("distance_from_work"),
        password: formData.get("password"),
      },
    };

    await fetch(
      `http://sustainability-app.herokuapp.com/api/user/${props.user.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );
    props.fetchData();
  }

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        {props.icon}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className="form-wrap">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <DialogTitle id="form-dialog-title">{`Hello ${props.user.first_name}`}</DialogTitle>
            <DialogContentText>
              To edit your profile, please enter your new details. If you have
              changed departments, please contact human resources department.
            </DialogContentText>
            <DialogContent class="dialog-content-container">
              <TextField
                id="first_name"
                name="first_name"
                label="First Name"
                type="Text"
                variant="outlined"
                fullWidth
              />
              <br />
              <br />
              <TextField
                id="last_name"
                name="last_name"
                label="Last Name"
                type="Text"
                variant="outlined"
                fullWidth
              />
              <br />
              <br />
              <TextField
                id="email"
                name="email"
                label="Email"
                type="Text"
                variant="outlined"
                fullWidth
              />
              <br />
              <br />
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <br />
              <br />
              <TextField
                id="distance_from_work"
                name="distance_from_work"
                label="Distance From Work"
                type="number"
                variant="outlined"
                fullWidth
              />
            </DialogContent>
            <br />
            <DialogActions>
              <Button onClick={handleSignOut} color="primary">
                Sign Out
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={handleClose} color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
