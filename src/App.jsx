import React, { Component } from "react";
import "./App.scss";
import MainRouter from "./MainRouter";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <MainRouter />
        </div>
      </Router>
    );
  }
}

export default App;
