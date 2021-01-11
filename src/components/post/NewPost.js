import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { create } from "./api-post.js";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraSharpIcon from "@material-ui/icons/PhotoCameraSharp";
import VideocamSharpIcon from '@material-ui/icons/VideocamSharp';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme) => ({
  root: {
    float: "left",
    width: 600,
  },
  card: {
    maxHeight: 103,
    minHeight: 103,
    maxWidth:560,
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(65, 150, 136, 0.09)",
    boxShadow: "none",
  },
  cardContent: {
    backgroundColor: "#757575",
    paddingTop: 0,
    paddingBottom: 0,
  },
  photoButton: {
    height: 30,
  },
  input: {
    display: "none",
  },
  textField: {
    width: "90%",
    backgroundColor: "#757575",
  },
  multilineColor: {
    color: "white",
    fontWeight: "bolder",
  },
  submit: {
    margin: theme.spacing(3),
  },
  filename: {
    verticalAlign: "super",
  },
}));

export default function NewPost(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    content: "",
    image: "",
    title: "",
    error: "",
    user: {},
  });

  const clickPost = () => {
    let postData = new FormData();

    postData.append("content", values.content);
    postData.append("image", values.image);
    postData.append("title", values.title);
    console.log(postData.get("content"));
    console.log(postData.get("image"));

    // console.log('postdata:', postData);
    create(postData).then((data) => {
      console.log("data", data);
      if (data.value) {
        // console.log('data error:', data);
        setValues({ ...values, error: data.value });
      } else {
        // console.log('date error:', data);
        props.fetchAllPosts();
        setValues({ ...values, content: "", image: "", title: "" });
        // props.addUpdate(data)
      }
    });
  };
  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };
  // const photoURL = values.user._id ?'/api/users/photo/'+ values.user._id : '/api/users/defaultphoto'
  return (
    <div className={classes.root}>
      <Card className={classes.card} style={{ backgroundColor: "#757575" }}>
        <CardContent className={classes.cardContent}>
          <TextField
            placeholder="Description to your post."
            multiline
            InputProps={{
              className: classes.multilineColor,
            }}
            rows="15"
            value={values.content}
            onChange={handleChange("content")}
            className={classes.textField}
            margin="normal"
          />
        </CardContent>
      </Card>
      <input
        accept="image/*"
        onChange={handleChange("image")}
        className={classes.input}
        id="icon-button-file"
        type="file"
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="default"
          className={classes.photoButton}
          component="span"
        >
          <PhotoCameraSharpIcon
            style={{
              color: "black",
              border: "3px solid white",
              borderRadius: "5px",
              backgroundColor: "white",
              minHeight:'2.2rem',
              minWidth:'2.2rem'
            }}
          />
        </IconButton>

        <IconButton
          color="default"
          className={classes.photoButton}
          component="span"
        >
          <VideocamSharpIcon
            style={{
              color: "black",
              border: "3px solid white",
              borderRadius: "5px",
              backgroundColor: "white",
              minHeight:'2.2rem',
              minWidth:'2.2rem'
            }}
          />
        </IconButton>
      </label>{" "}
      <span className={classes.filename}>
        {values.image ? values.image.name : ""}
      </span>
      {values.error && (
        <Typography component="p" color="error">
          <Icon color="error" className={classes.error}>
            error: {values.error}
          </Icon>
        </Typography>
      )}
      <CardActions>
      <Box textAlign='center'>
        <Button
          style={{
            color: "white",
            border: "3px solid #2676E1",
            borderRadius: "5px",
            backgroundColor: "#2676E1",
            marginLeft:'28.5rem',
            marginTop:'-2.8rem'
          }}
          color="secondary"
          variant="contained"
          disabled={values.text === ""}
          onClick={clickPost}
          className={classes.submit}
        >
          Publish
        </Button>
        </Box>
      </CardActions>
    </div>
  );
}

