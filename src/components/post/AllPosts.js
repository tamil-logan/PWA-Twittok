import React from "react";
import PostTemp from "./PostTemp";

export default function AllPosts(props) {
  
  return <PostTemp posts={props.posts} setPosts={props.setPosts} />;
}
