import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';

const validEmailRegex =
  
  RegExp(
    //eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: {
        username: "",
        email: "",
        password: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "username":
        errors.username =
          value.length < 5 ? "User Name must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      // console.log(errors)
    });
  };

  onSubmit = async () => {
    const response = await this.props.mutate({
      variables: this.state,
    });
    console.log(response);
  };

  handleRegistration = (e) => {
    e.preventDefault();
    let url = "http://127.0.0.1:5000/register";
    let formData = {};
    console.log(formData);
    let data = this.state;
    for (let name in data) {
      formData[name] = data[name];
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);

        if (
          localStorage.getItem("token") !== null &&
          localStorage.getItem("token") !== "undefined"
        ) {
          window.location.replace("/");
        } else {
          alert(data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <Grid item xs={12} sm={6}>
        <div className="header addon marginnew">Welcome to TwitTok.</div>
        <div className="header lato">Open the new creative world.</div>
        <div className="header editlato">It's all here.</div>


        <div className="header subadd">Create Account</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={this.handleChange}
                value={this.state.username}
              />
              {errors.username.length > 0 && (
                <span className="error">{errors.username}</span>
              )}
            </div>
              
            <div className="form-group">
            <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={this.state.email}
              />
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
            </div>
            <div className="form-group">

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
              </div>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={this.handleRegistration}
            type="button"
            className="btn loginbtn"
          >
            Register
          </button>
        </div>
        </Grid>
      </div>
    );
  }
}
