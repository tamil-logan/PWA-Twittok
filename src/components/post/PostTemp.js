import React, { useState, useEffect } from "react";
import Picture from "../../post.jpeg";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import auth from "./../login/auth-helper";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 315,
    width: 560,
  },
  cardHeader: {
    marginLeft: "-1rem",
  },
}));

function PostItem(props) {
  const classes = useStyles();
  const { post, posts, setPosts } = props;
  const [likes, setLikes] = useState([]);
  const jwt = auth.isAuthenticated();

  function fetchAllLikes() {
    const apiURL = "http://localhost:5000/getPostLikes/" + post.id;

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
    console.log(likes)
    return likes.find((e) => e.user_id === jwt.id) ? true : false;

  }
  //deletePost
  const url = "http://localhost:5000/deletePost";
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
    fetch("http://localhost:5000/likePost", {
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
    fetch("http://localhost:5000/likePost", {
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
        avatar={<Avatar />}
        title={post["author.username"]}
        className={classes.cardHeader}
      />
      {/* <img src={'file:///Users/ahmed/Downloads/tp-backend-dev 3/post_upload/'+ post.image_filename} alt="post"/> */}
      <img className={classes.media} src={Picture} alt="post" />
      <h5 className="post_content ">{post.content} </h5>

      <IconButton onClick={remove} style={{ color: "white" }}>
        <DeleteIcon />
      </IconButton>

      <IconButton
        onClick={isLikedByTheUser() ? dislike : like}
        className={classes.button}
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
