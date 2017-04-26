import React from "react";
import { Link } from "react-router-dom"; 
import "./Sidebar.css"; 

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <ul>
        <li><Link to="/development">Development</Link></li>
        <li><Link to="/pods">Pods</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar; 
