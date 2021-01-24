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
import auth from "./../login/auth-helper";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { AirlineSeatLegroomNormal } from "@material-ui/icons";
import Display from "../../display.jpeg";


const theme = createMuiTheme({
  typography: {
    htmlFontSize: 8,
    fontFamily: ["Roboto"].join(","),
  },
});
// const Styles = {
//   avatars: {
//     height: "284px",
//     width: "281px",
//     fontSize: "80px",
//     [theme.breakpoints.down('sm')]: {
//       display: "flex",
//       float: "left",
//      marginBottom: "200px !important",
//       height: "250px",

//       width: "250px",

//       fontSize: "30px",
//       marginTop: "0!important",
//     },

//   },

// }

const useStyles = makeStyles((theme) => ({
  right:{
    marginLeft:'auto'
  },
  titles: {

 padding: `${theme.spacing(0)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,    
    color: theme.palette.openTitle,
    fontSize: "2em",
    fontWeight: "bold",
    marginTop:"-27rem",
    [theme.breakpoints.down("sm")]: {
      fontSize:"1rem",
      fontWeight: "normal",
     marginTop:"1rem",
     marginRight:"2rem"

      
    },
  },
  username: {
    fontSize: "3rem",
    lineHeight: "0",
    [theme.breakpoints.down("sm")]: {
      float: "Right",
      // marginTop: "-1650px",
      fontSize: "1.5rem",
      marginRight: ".8rem",
    },
  },
  email: {
    fontSize: "1.5rem",
    color: "rgba(33,115,230,1)",
    lineHeight: "0",
    [theme.breakpoints.down("sm")]: {
      float: "right",
      // marginTop: "-1625px",
      fontSize: ".7rem",
      marginRight: "-1.4rem",
      //marginBottom: "100px !important",
    },
  },
  media: {
    minHeight: 330,
  },
  avatars: {
    height: "284px",
    width: "281px",
    fontSize: "80px",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      float: "left",
      //marginBottom: "-100px !important",
      height: "150px",

      width: "150px",

      fontSize: "30px",
      // marginTop: "-1700px !important",
    },
  },
  subtitle: {
    color: theme.palette.openTitle,
    fontSize: "2em",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    fontWeight: "normal",
    marginLeft: "-2rem",
      
    },
  },
  float: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#2676E1",
    borderRadius: "20px",
    maxHeight: "2rem",
    marginTop: "1rem",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      float: "Right",
      //marginBottom: "-100px !important",
      marginRight: "-2px",
      // marginTop: "-1600px !important",
      fontWeight: "100",
    },
  },
  floats: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#2676E1",
    borderRadius: "20px",
    maxHeight: "2rem",
    marginTop: "1rem",
    marginLeft: "1rem",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      float: "right",
      //marginBottom: "-100px !important",
      marginTop: "-10px !important",
      fontWeight: "100",
      marginLeft: "210px",
      maxHeight: "4rem",
      minWidth:"6rem"
    },
  },
}));
export default function Newsfeed() {
  const classes = useStyles();

  const [posts, setPosts] = useState(false);

  const apiURL = "https://twittok.herokuapp.com/getPosts";

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

  const jwt = auth.isAuthenticated();

  return (
    <div>
      
        <Grid container justify="center" spacing={0} direction="column" alignItems="center" justify="center" >
        <Grid className={classes.right}>
          <div className={classes.avatar}>
            <Avatar
              className={classes.avatars}
              alt={jwt.username}
              src={Display}
              //style={{ height: "284px", width: "281px", fontSize: "80px" }}
            />
          </div>
          <ThemeProvider theme={theme}>
            <p className={classes.username}>{jwt.username}</p>
            <p className={classes.email}>{jwt.email}</p>
          </ThemeProvider>
          <Button
            className={classes.float}
            color="inherit"
            component={Link}
            to="/posts"
          >
            My Posts
          </Button>

          <Button
            className={classes.floats}
            color="inherit"
            component={Link}
            to="/myprofile"
          >
            Edit Profile
          </Button>
        </Grid>
        <Typography
            type="title"
            className={classes.titles}
            style={{ color: "white" }}
          >
            What's on your mind?
          </Typography>
        <Grid item xs={5}>
        
          <NewPost fetchAllPosts={fetchAllPosts} />
          <Typography
            type="title"
            className={classes.subtitle}
            style={{ color: "white" }}
          >
            Posts
          </Typography>

          <AllPosts posts={posts} setPosts={setPosts} />
        </Grid>
        </Grid>
     
    </div>
  );
}
