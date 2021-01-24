import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import auth from "./../login/auth-helper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import PostTemp from './PostTemp';
import Display from "../../display.jpeg";




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //margin: 30,
  },
  title: {
    color: theme.palette.openTitle,
    fontSize: "2em",
    fontWeight: "bold",
    [theme.breakpoints.down('sm')]: {
marginTop:"10rem",
marginLeft:"-1rem"
    },
  },
  avatarss: {
    height: "284px", 
    width: "281px", 
    fontSize: "80px",
    [theme.breakpoints.down('sm')]: {
      display: "flex !important",
      float: "left !important",
     //marginBottom: "-100px !important",
      height: "150px",
      
      width: "150px", 
      
      fontSize: "2rem",
      marginTop: "-750px !important",
      marginLeft: "-160px",
    },
  },
  username:{
    [theme.breakpoints.down('sm')]: {
      fontSize: "0.8rem",
      marginTop: "-700px !important",
      marginLeft: "3rem",
      marginRight:"3rem"
    },
  },
  email:{
    [theme.breakpoints.down('sm')]: {
      marginRight: "-1rem",
      fontSize:"0.6rem"
    },

  }

}));

export default function Home({history}) {
  const classes = useStyles();
  const [postPage, setPostPage] = useState(false);
   const [posts, setPosts] = useState(false)

   const jwt = auth.isAuthenticated()
//    console.log(jwt);

   const apiURL = "https://twittok.herokuapp.com/getUserPosts/" + jwt.id + "?page=1";

       const fetchData = () => {
       axios.get(apiURL,{
        headers: {
            'Authorization': `${localStorage.getItem("token")}`
          }
       })
       .then((response)=>{
           const postData= response.data;
           setPosts(postData)
        //    console.log(postData)

       })
       .catch(error=>console.error(`Error: ${error}`));
    }
    useEffect(() => {
        fetchData();
   }, []);
  //  console.log(posts);
  useEffect(() => {
    setPostPage(auth.isAuthenticated());
    const unlisten = history.listen(() => {
      setPostPage(auth.isAuthenticated());
    });
    return () => {
      unlisten();
    };
  }, []);
  return (
    <div className={classes.root}>
      {!postPage && (
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <p>You need to login to see your posts. </p>
            </Grid>
          </Grid>
        </div>
      )}
      {postPage && (
        <div>
          <Grid container spacing={4} justify="flex-end">
            <Grid item sm={6}>
              <Typography
                type="title"
                className={classes.title}
                style={{ color: "white" }}
              >My Posts
              </Typography>
              <PostTemp style={{marginLeft:"-2rem"}} posts={posts} setPosts={setPosts}/>
            </Grid>

            <Grid item sm={3}>
              <Avatar
              type="avatarss"
              className={classes.avatarss}
                alt={localStorage.getItem("username")}
                src={Display}
              />
              <Typography className={classes.username}>
                {localStorage.getItem("username")}
              </Typography>
              <Typography className={classes.email}>{localStorage.getItem("email")}</Typography>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
