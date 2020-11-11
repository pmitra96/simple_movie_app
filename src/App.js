import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from  "./Containers/Home"
import SearchMovies from "./Containers/SearchMovies"
import CommonMovies from "./Containers/CommonMovies"

class App extends Component {
  render() {
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path ="/search" component = {SearchMovies}/>
          <Route exac path ="/common" component = {CommonMovies} /> 
        </div>
      </Router>
    );
  }
}

export default App;