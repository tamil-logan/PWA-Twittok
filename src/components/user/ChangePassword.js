import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { changepass } from "./user-apis";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: "middle",
  },
  submit: {
    marginBottom: theme.spacing(2),
    marginTop: "1rem",
    margin: theme.spacing(44),
  },
}));

export default function ChangePassword() {
  const classes = useStyles();
  const [values, setValues] = useState({
    old_password: "",
    password: "",
    confirmpassword: "",
  });

  const clickSubmit = () => {
    let user = {
      old_password: values.old_password,
      password: values.password,
    };

    if (values.password !== values.confirmpassword) {
      alert("password don't match");
    } else {
      changepass(user);
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div
      className={classes.root}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={6}>
          <Typography variant="h4" className={classes.title}>
            Change Password
          </Typography>
          <br />
          <label>
            Old Password
            <br />
            <input
              type="password"
              name="oldpassword"
              value={values.old_password}
              onChange={handleChange("old_password")}
              style={{
                backgroundColor: "#7F8287",
                border: "none",
                boxShadow: "0px 3px 6px #00000029",
              }}
            />
          </label>
          <br />
          <label>
            New Password <br />
            <input
              id="new password"
              type="password"
              margin="normal"
              name="password"
              value={values.newpassword}
              onChange={handleChange("password")}
              style={{
                backgroundColor: "#7F8287",
                border: "none",
                boxShadow: "0px 3px 6px #00000029",
              }}
            />
          </label>
          <br />
          <label>
            Confirm New Password
            <br />
            <input
              id="confirm password"
              type="password"
              margin="normal"
              name="confirmpassword"
              value={values.confirmpassword}
              onChange={handleChange("confirmpassword")}
              style={{
                backgroundColor: "#7F8287",
                border: "none",
                boxShadow: "0px 3px 6px #00000029",
              }}
            />
          </label>
          <br />
          <Button
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={clickSubmit}
            style={{
              borderRadius:"23px",
              backgroundColor:"#2676E1"
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
