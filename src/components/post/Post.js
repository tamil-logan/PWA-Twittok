import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import auth from "./../login/auth-helper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import PostTemp from './PostTemp';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  title: {
    padding: `${theme.spacing(0)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    fontSize: "2em",
    fontWeight: "bold",
  },
}));

export default function Home({history}) {
  const classes = useStyles();
  const [postPage, setPostPage] = useState(false);
   const [posts, setPosts] = useState(false)

   const jwt = auth.isAuthenticated()
//    console.log(jwt);

   const apiURL = "http://localhost:5000/getUserPosts/" + jwt.id + "?page=1";

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
          <Grid container spacing={10}>
            <Grid item xs={9}>
              <Typography
                type="title"
                className={classes.title}
                style={{ color: "white" }}
              >Post
              </Typography>
              <PostTemp posts={posts} setPosts={setPosts}/>
            </Grid>

            <Grid item xs={3}>
              <Avatar
                alt={localStorage.getItem("username")}
                src="/static/images/avatar/1.jpg"
                style={{
                  height: "284px",
                  width: "281px",
                  fontSize: "80px",
                  border: "2px solid white",
                }}
              />
              <p className={classes.username}>
                {localStorage.getItem("username")}
              </p>
              <p className={classes.email}>{localStorage.getItem("email")}</p>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
