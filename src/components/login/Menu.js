import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import auth from "./auth-helper";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../twit-tok-logo.png"




const Menu = withRouter(({ history }) => (
  <AppBar
    style={{ 
      background: "transparent",
      boxShadow: "none",
      //marginTop:"-1rem"
    }}
    position="static"
  >
    <Toolbar>
      <Typography
        variant="h6"
        
        color="inherit"
        style={{ fontFamily: "roboto", color: "#f1f2f3",flex: 1}}
      >
        <img src={Logo} alt="logo" className="logo"/>
        
      </Typography>
      <Link to="/"></Link>
      {!auth.isAuthenticated() && (
        <span>
          <Button
            // className="float"
            // color="inherit"
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "transparent",
              marginLeft: "1rem",
              border: "2px solid #FFFFFF",
              borderRadius: "20px",
              maxHeight: "2rem",
              //paddingLeft:"2rem"
            }}
            component={Link}
            to="/"
          >
            Home
          </Button>
            <Button
            // className="float"
            // color="inherit"
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "transparent",
                marginLeft: "1rem",
                border: "2px solid #FFFFFF",
                borderRadius: "20px",
                maxHeight: "2rem",
              }}
              component={Link}
              to="/signin"
            >
              Login
            </Button> 
          <Button
          // className="float"
          //  color="inherit"
            style={{
              color: "black",
              fontWeight: "bold",
              backgroundColor: "white",
              marginLeft: "1rem",
              border: "2px solid #FFFFFF",
              borderRadius: "20px",
              maxHeight: "2rem",
              display: "inline-block" 
             // justify-content: "inherit"
            }}
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </span>
        
      )}

      
      {auth.isAuthenticated() && (
        <span>
          <Button
            className="float"
            color="inherit"
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "transparent",
              marginLeft: "1rem",
              border: "2px solid #FFFFFF",
              borderRadius: "20px",
              maxHeight: "2rem",
            }}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            className="float"
            color="inherit"
            style={{
              color: "black",
              fontWeight: "bold",
              backgroundColor: "white",
              marginLeft: "1rem",
              border: "2px solid #FFFFFF",
              borderRadius: "20px",
              maxHeight: "2rem",
            }}
            onClick={() => {
              auth.clearJWT(() => history.push("/"));
            }}
          >
            Sign out
          </Button>
        </span>
      )}
    </Toolbar>
  </AppBar>
));

export default Menu;
