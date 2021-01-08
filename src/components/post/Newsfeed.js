import React, { useState, useEffect } from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NewPost from "./NewPost";
import Avatar from "@material-ui/core/Avatar";
import AllPosts from "./AllPosts";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 8,
    fontFamily: ["Roboto"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
  title: {
    padding: `${theme.spacing(0)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    fontSize: "2em",
    fontWeight: "bold",
  },
  username: {
    fontSize: "3rem",
    lineHeight: "0",
  },
  email: {
    fontSize: "1.5rem",
    color: "rgba(33,115,230,1)",
    lineHeight: "0",
  },
  media: {
    minHeight: 330,
  },
  avatar: {
    display: "flex",
  },
  subtitle:{
    color: theme.palette.openTitle,
    fontSize: "2em",
    fontWeight: "bold",
    textAlign:"center",
    marginLeft:"-13rem"
  }  
}));
export default function Newsfeed() {
  const classes = useStyles();

  const [posts, setPosts] = useState(false);

  const apiURL = "http://localhost:5000/getPosts";

  const fetchAllPosts = () => {
    axios
      .get(apiURL, {
        headers: {
          //  'Authorization': `${localStorage.getItem("token")}`
        },
      })
      .then((response) => {
        const postData = response.data;
        setPosts(postData);
        // console.log(postData)
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xs={9}>
          <Typography
            type="title"
            className={classes.title}
            style={{ color: "white" }}
          >
            Post
          </Typography>

          <NewPost fetchAllPosts={fetchAllPosts} />
        </Grid>

        <Grid item xs={3}>
          <div className={classes.avatar}>
            <Avatar
              alt={localStorage.getItem("username")}
              src="/static/images/avatar/1.jpg"
              style={{ height: "284px", width: "281px", fontSize: "80px" }}
            />
          </div>
          <ThemeProvider theme={theme}>
            <p className={classes.username}>
              {localStorage.getItem("username")}
            </p>
            <p className={classes.email}>{localStorage.getItem("email")}</p>
          </ThemeProvider>
          <Button
            className="float"
            color="inherit"
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2676E1",
              borderRadius: "20px",
              maxHeight: "2rem",
              marginTop: "1rem",
            }}
            component={Link}
            to="/posts"
          >
            My Posts
          </Button>

          <Button
            className="float"
            color="inherit"
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2676E1",
              borderRadius: "20px",
              maxHeight: "2rem",
              marginTop: "1rem",
              marginLeft: "1rem",
            }}
            component={Link}
            to="/myprofile"
          >
            Edit Profile
          </Button>
        </Grid>
        </Grid>
        <Typography
            type="title"
            className={classes.subtitle}
            style={{ color: "white"}}
          >
            All Posts
          </Typography>

        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        >

          <Grid item xs={3}>
          <AllPosts posts={posts} setPosts={setPosts} />
        </Grid>

        </Grid>
     
    </div>
  );
}
