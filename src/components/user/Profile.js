import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraSharpIcon from "@material-ui/icons/PhotoCameraSharp";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { read, update,uploadProfilePic } from "./user-apis";


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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: theme.spacing(3),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.text.secondary,
  },
  root:{
marginLeft:"2rem"
  }
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
        setValues({ ...values, image: "", });
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
                }}
              />
            </IconButton>
          </label>{" "}
          <Button color="primary" variant="contained" className={classes.submit} onClick={uploadPicture}  style={{
                  color: "white",
                  border: "1px solid white",
                  backgroundColor: "transparent",
                  minHeight: "2.2rem",
                  minWidth: "2.2rem",
                }}>
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
            }}
          >
            Profile Settings
          </Typography>
          <TextField
            id="multiline-flexible"
            multiline
            rows="2"
            value={values.name}
            className={classes.textField}
            margin="normal"
            onChange={handleChange("name")}
            label="Name"
          />
          <br />
          <TextField
            id="multiline-flexible"
            multiline
            rows="2"
            value={values.username}
            className={classes.textField}
            margin="normal"
            onChange={handleChange("username")}
            label="User Name"
          />
          <br />
          <TextField
            id="multiline-flexible"
            multiline
            rows="2"
            value={values.email}
            className={classes.textField}
            margin="normal"
            onChange={handleChange("email")}
            label="Email Address"   
          />
          <br />
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
