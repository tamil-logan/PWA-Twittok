import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraSharpIcon from "@material-ui/icons/PhotoCameraSharp";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { read, update, uploadProfilePic } from "./user-apis";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  photoButton: {
    height: 30,
    marginBottom: 10,
    paddingBottom: 0,
    top: 0,
    right: 0,
    left: 0,
    bottom: 2,
  },
  input: {
    display: "none",
  },
  textField: {
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: theme.spacing(3),
  },
  title: {
    color: "white",
  },
  root: {
    marginLeft: "2rem",
  },
  multilineColor: {
    color: "white",
    fontWeight: "bolder",
  },
  labelRoot: {
    color: "white",
    fontWeight: "bolder",
    fontSize: "30px",
    marginBottom: "3rem",
  },
}));

export default function Profile() {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    username: "",
    image: "",
    email: "",
  });

  useEffect(() => {
    read().then((data) => {
      if (data & data.value) {
        setValues({ ...values, error: data.value });
      } else {
        setValues({
          ...values,
          name: data.name,
          username: data.username,
          email: data.email,
        });
      }
    });
  }, []);

  const uploadPicture = () => {
    let postData = new FormData();

    postData.append("image", values.image);
    console.log(postData.get("image"));

    // console.log('postdata:', postData);
    uploadProfilePic(postData).then((data) => {
      console.log("data", data);
      if (data.value) {
        // console.log('data error:', data);
        setValues({ ...values, error: data.value });
      } else {
        // console.log('date error:', data);
        setValues({ ...values, image: "" });
        // props.addUpdate(data)
      }
    });
  };
  const handleImageChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    let user = {
      name: values.name,
      username: values.username,
      email: values.email,
    };

    update(user).then((data) => {
      if (data && data.value) {
        setValues({ ...values, error: data.value });
      }
    });
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <Avatar
            alt={localStorage.getItem("username")}
            src="/static/images/avatar/1.jpg"
            style={{ height: "284px", width: "281px", fontSize: "80px" }}
          />
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            className={classes.input}
            onChange={handleImageChange("image")}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="default"
              component="span"
              className={classes.photoButton}
            >
              <PhotoCameraSharpIcon
                style={{
                  color: "black",
                  border: "3px solid white",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  minHeight: "2.2rem",
                  minWidth: "2.2rem",
                  marginRight:"-3rem"
                }}
              />
            </IconButton>
          </label>{" "}
          <Button
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={uploadPicture}
            style={{
              color: "white",
              backgroundColor: "transparent",
              minHeight: "2.2rem",
              minWidth: "2.2rem",
              fontWeight: "bold",
              boxShadow: "none",
            }}
          >
            Change Profile Picture
          </Button>
        </Grid>

        <Grid item xs={8}>
          <Typography
            variant="h6"
            className={classes.title}
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize:"35px"
            }}
          >
            Profile Settings
          </Typography>

          <Typography
            variant="h6"
            className={classes.title}
            style={{
              color: "white",
              fontWeight: "bold",
              marginTop:"2rem"
            }}
          >
            Name
          </Typography>
          <TextField
            id="multiline-flexible"
            multiline
            rows="2"
            value={values.name}
            className={classes.textField}
            margin="normal"
            onChange={handleChange("name")}
            InputProps={{
              className: classes.multilineColor,
            }}
            style={{
              borderBottom: "1px solid white",
            }}
          />
          <br />
          <Typography
            variant="h6"
            className={classes.title}
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            User Name
          </Typography>
          <TextField
            id="multiline-flexible"
            multiline
            rows="2"
            value={values.username}
            className={classes.textField}
            margin="normal"
            onChange={handleChange("username")}
            InputProps={{
              className: classes.multilineColor,
            }}
            style={{
              borderBottom: "1px solid white",
            }}
          />
          <br />
          <Typography
            variant="h6"
            className={classes.title}
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Email Address
          </Typography>
          <TextField
            id="multiline-flexible"
            multiline
            rows="2"
            value={values.email}
            className={classes.textField}
            margin="normal"
            onChange={handleChange("email")}
            InputProps={{
              className: classes.multilineColor,
            }}
            style={{
              borderBottom: "1px solid white",
            }}
          />
          <br />
          <Button
            className="float"
            color="inherit"
            style={{
              color: "#2676E1",
              fontWeight: "bold",
              backgroundColor: "transparent",
              marginLeft: "7rem",
              maxHeight: "2rem",
              fontSize: "1rem",
            }}
            component={Link}
            to="/changepass"
          >
            Change Password >>
          </Button>
          <br />
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
            style={{
              marginLeft: "14.5rem",
              backgroundColor: "#2676E1",
              borderRadius:"23px",
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
