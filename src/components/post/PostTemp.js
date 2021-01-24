import React, { useState, useEffect } from "react";
import Picture from "../../post.jpeg";
import Display from "../../display.jpeg";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import auth from "./../login/auth-helper";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  title:{
    [theme.breakpoints.down("sm")]: {
      marginLeft:"-4rem"
    }
  },
  media: {
    height: 350,
    width: 560,
    [theme.breakpoints.down("sm")]: {
      width:250,
      height:180,
      marginLeft:"-4rem"
    }
  }, 
  cardHeader: {
    marginLeft: "-1.5rem",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      float: "left",
      marginLeft:"-5rem"
     
    },
   
    buttons: {
      [theme.breakpoints.down("sm")]: {
        display: "flex",
      float: "left",
        // height: "15px",
        // width: "15px",
        marginLeft:"-5rem"
      },
    },
  },
}));

function PostItem(props) {
  const classes = useStyles();
  const { post, posts, setPosts } = props;
  const [likes, setLikes] = useState([]);
  const jwt = auth.isAuthenticated();

  function fetchAllLikes() {
    const apiURL = "https://twittok.herokuapp.com/getPostLikes/" + post.id;

    axios
      .get(apiURL, {
        headers: {
          //  'Authorization': `${localStorage.getItem("token")}`
        },
      })
      .then((response) => {
        const postData = response.data;
        // console.log(postData);
        setLikes(postData);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }
  useEffect(() => {
    fetchAllLikes();
  }, []);

  function isLikedByTheUser() {
    return likes.find((e) => e.user_id === jwt.id) ? true : false;
  }
  //deletePost
  const url = "https://twittok.herokuapp.com/deletePost";
  const remove = async () => {
    await axios
      .delete(url, {
        data: { id: post.id },
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const postData = response.data;
        console.log(postData);
        if (postData.type === 1) {
          let temp = [];
          posts.forEach((post1) => {
            if (post1.id !== post.id) temp.push(post1);
          });

          setPosts(temp);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  //likePost

  const like = () => {
    fetch("https://twittok.herokuapp.com/likePost", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id: post.id, like: 1 }),
    })
      .then((e) => e.json())
      .then((res) => {
        fetchAllLikes();
        console.log(res);
      })
      .catch(console.log);
  };
  const dislike = () => {
    fetch("https://twittok.herokuapp.com/likePost", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id: post.id, like: 0 }),
    })
      .then((e) => e.json())
      .then((res) => {
        fetchAllLikes();
        console.log(res);
      })
      .catch(console.log);
  };

  function getFilteredLikes() {
    let temp = [];
    likes.forEach((like) => {
      if (temp.find((e) => e.user_id === like.user_id)) return;
      temp.push(like);
    });
    return temp;
  }

  return (
    <div className="post">
      <CardHeader
        avatar={<Avatar alt="mousa" src={Display} />}
        title={post["author.username"]}
        className={classes.cardHeader}
      />
      {/* <img src={'file:///Users/ahmed/Downloads/tp-backend-dev 3/post_upload/'+ post.image_filename} alt="post"/> */}
      <img
        className={classes.media}
        src={Picture}
        alt="post"
      />
       <Typography
                type="title"
                className={classes.title}
                style={{ color: "white" }}
              >{post.content}
              </Typography>
      {/* <h5 className="classes.post_content"> </h5> */}

      <IconButton className={classes.title} onClick={remove} style={{ color: "white" }}>
        <DeleteIcon />
      </IconButton>

      <IconButton
        onClick={isLikedByTheUser() ? dislike : like}
        className={classes.buttons}
        aria-label="Like"
        color="secondary"
      >
        {isLikedByTheUser() ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      {getFilteredLikes()
        .map((e) => e.username)
        .join(", ")}
    </div>
  );
}

export default function PostTemp(props) {
  console.log(props);

  return (
    <>
      {!props.posts || props.posts.length === 0 ? (
        <h3>No posts yet</h3>
      ) : (
        props.posts.map((post) => (
          <PostItem
            key={Math.random()}
            post={post}
            posts={props.posts}
            setPosts={props.setPosts}
          />
        ))
      )}
    </>
  );
}
