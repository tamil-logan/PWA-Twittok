import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { changepass } from "./user-apis";


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
    margin: theme.spacing(42),
  },
  root: {
    float: "left",
    width: 600,
    marginLeft: "2rem",
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
    }

    if(values.password!==values.confirmpassword){
        alert("password don't match")
    }
    else{
        changepass(user);
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };


  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Change Password
      </Typography>
      <br />
      <label>
        Old Password:
        <br />
        <input 
        type="password" 
        name="oldpassword" 
        placeholder="Old Password" 
        value={values.old_password}
        onChange={handleChange("old_password")}
        />
      </label>
      <br />
      <label>
        New Password: <br />
        <input
          id="new password"
          type="password"
          placeholder="New Password"
          margin="normal"
          name="password"
          value={values.newpassword}
          onChange={handleChange("password")}
        />
      </label>
      <br />
      <label>
        Confirm New Password:
        <input
          id="confirm password"
          type="password"
          placeholder="Confirm New Password"
          margin="normal"
          name="confirmpassword"
          value={values.confirmpassword}
          onChange={handleChange("confirmpassword")}

        />
      </label>
      <br />
      <Button color="primary" variant="contained" className={classes.submit} onClick={clickSubmit}>
        Submit
      </Button>
    </div>
  );
}
