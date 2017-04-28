import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <Header />
      <ul>
        <li><Link to="/development">Development</Link></li>
        <li><Link to="/logs">Logs</Link></li>
        <li><Link to="/pods">Pods</Link></li>
        <li><Link to="/environment-variables">Environments</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
