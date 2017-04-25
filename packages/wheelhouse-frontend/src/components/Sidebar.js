import React, { Component } from "react";
import { Link } from "react-router-dom"; 

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <ul>
          <li><Link to="/pods">Pods</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>
      </div>
    );
  }
}

export default Sidebar; 
