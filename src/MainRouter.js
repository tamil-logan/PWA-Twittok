import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login, Register } from "./components/login";
import { Home } from "./components/login/Home";
import Menu from "./components/login/Menu";
import Post from "./components/post/Post";
import ChangePassword from "./components/user/ChangePassword";
import Profile from "./components/user/Profile";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Register} />
        <Route path="/signin" component={Login} />
        <Route path="/posts" component={Post} />
        <Route path="/myprofile" component={Profile} />
        <Route path="/changepass" component={ChangePassword} />


      </Switch>
    </div>
  );
};

export default MainRouter;
