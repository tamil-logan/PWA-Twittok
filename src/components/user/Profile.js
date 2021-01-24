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
import auth from "./../login/auth-helper";
import Display from "../../display.jpeg";


const useStyles = makeStyles((theme) => ({
  photoButton: {
    height: 30,
    marginBottom: 10,
    paddingBottom: 0,
    top: 0,
    right: 0,
    left: 0,
    bottom: 2,
    // color: "black",
    // border: "3px solid white",
    // borderRadius: "5px",
    // backgroundColor: "white",
    // minHeight: "2.2rem",
    // minWidth: "2.2rem",
    //marginRight:"-3rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "2.5rem",
      //  paddingBottom: 0,
      //  top: 0,
      //  right: 0,
      //  left: 0,
      //bottom: 2,
      height: 10,
      width: 20,
      //marginBottom: 10,minHeight: "2.2rem",
      minHeight: ".4rem",
      minWidth: ".4rem",
      marginTop: "20px",
    },
  },
  input: {
    display: "none",
  },
  textField: {
    marginRight: theme.spacing(1),
    width: 300,
    margin: "normal",
    [theme.breakpoints.down("sm")]: {
      width: 250,
      marginTop: "7px !important",

      marginLeft: "-100px",
      fontWeight: "normal",
    },
  },
  submits: {
    margin: theme.spacing(3),
    color: "white",
    backgroundColor: "transparent",
    minHeight: "2.2rem",
    minWidth: "2.2rem",
    fontWeight: "bold",
    boxShadow: "none",
    [theme.breakpoints.down("sm")]: {
      fontWeight: "normal",

      //display:"none",
      marginTop: "-35px !important",
      marginLeft: "100px",
    },
  },
  titles: {
    color: "white",
    fontWeight: "bold",
    fontSize: "35px",

    [theme.breakpoints.down("sm")]: {
      fontWeight: "normal",
      fontSize: "25px",

      marginTop: "15px !important",
      marginLeft: "-65px",

      fontWeight: "normal",
    },
  },
  titless: {
    color: "white",
    fontWeight: "bold",
    marginTop: "2rem",

    [theme.breakpoints.down("sm")]: {
      marginTop: "17rem !important",

      marginLeft: "-100px",
      fontWeight: "normal",
    },
  },
  titlesss: {
    color: "white",
    fontWeight: "bold",
    marginTop: "2rem",

    [theme.breakpoints.down("sm")]: {
      //marginTop: "19rem !important",

      marginLeft: "-100px",
      fontWeight: "normal",
    },
  },
  titlessss: {
    color: "white",
    fontWeight: "bold",
    marginTop: "2rem",

    [theme.breakpoints.down("sm")]: {
      //marginTop: "19rem !important",

      marginLeft: "-100px",
      fontWeight: "normal",
    },
  },
  // textFieldss:{
  //   marginRight: theme.spacing(1),
  //     width: 300,
  //     margin: "normal",

  //   [theme.breakpoints.down('sm')]: {

  //     marginTop: "19rem !important",

  //    marginLeft:"-80px",
  //      fontWeight: "normal",
  // },
  // },
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
  avatarss: {
    height: "284px",
    width: "281px",
    fontSize: "80px",
    [theme.breakpoints.down("sm")]: {
      // display: "flex",
      // float: "center",
      //marginBottom: "-100px !important",
      height: "150px",

      width: "150px",

      fontSize: "30px",
      marginTop: "70px !important",
      marginLeft: "70px",
    },
  },
  floatsss: {
    color: "#2676E1",
    fontWeight: "bold",
    backgroundColor: "transparent",
    marginLeft: "7rem",
    maxHeight: "2rem",
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      color: "#2676E1",
      fontWeight: "normal",
      backgroundColor: "transparent",
      marginLeft: "6rem",
      maxHeight: "2rem",
      fontSize: "1rem",
    },
  },
  submitssss: {
    marginLeft: "14.5rem",
    backgroundColor: "#2676E1",
    borderRadius: "23px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "5.5rem",
    },
  },
}));

export default function Profile({history}) {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    username: "",
    image: "",
    email: "",
  });
  const [profilePage, setProfilePage] = useState(false);


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

  useEffect(() => {
    setProfilePage(auth.isAuthenticated());
    const unlisten = history.listen(() => {
      setProfilePage(auth.isAuthenticated());
    });
    return () => {
      unlisten();
    };
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
      {!profilePage && (
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <p>You need to login to edit your Profile </p>
            </Grid>
          </Grid>
        </div>
      )}
      {profilePage && (
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <Avatar
            className={classes.avatarss}
            alt={localStorage.getItem("username")}
            src={Display}
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
                  marginRight: "-3rem",
                }}
              />
            </IconButton>
          </label>{" "}
          <Button
            color="primary"
            variant="contained"
            className={classes.submits}
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
            className={classes.titles}
            // style={{
            //   color: "white",
            //   fontWeight: "bold",
            //   fontSize:"35px"
            // }}
          >
            Profile Settings
          </Typography>

          <Typography
            variant="h6"
            className={classes.titless}
            // style={{
            //   color: "white",
            //   fontWeight: "bold",
            //   marginTop:"2rem"
            // }}
          >
            Name
          </Typography>
          <TextField
            id="multiline-flexible"
            multiline
            rows="2"
            value={values.name}
            className={classes.textField}
            //margin="normal"
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
            className={classes.titlesss}
            // style={{
            //   color: "white",
            //   fontWeight: "bold",
            // }}
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
            className={classes.titlessss}
            // style={{
            //   color: "white",
            //   fontWeight: "bold",
            // }}
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
            className="floatsss"
            color="inherit"
            style={{
              color: "#2676E1",
              //   fontWeight: "bold",
              //   backgroundColor: "transparent",
              //  marginLeft: "7rem",
              //  maxHeight: "2rem",
              //   fontSize: "1rem",
            }}
            component={Link}
            to="/changepass"
          >
            Change Password 
          </Button>
          <br />
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submitssss}
            // style={{
            //   marginLeft: "14.5rem",
            //   backgroundColor: "#2676E1",
            //   borderRadius:"23px",
            // }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
       )}
    </div>
  );
}
