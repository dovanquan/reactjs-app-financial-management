import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Home />
      </div>
    );
  }
}

export default App;
