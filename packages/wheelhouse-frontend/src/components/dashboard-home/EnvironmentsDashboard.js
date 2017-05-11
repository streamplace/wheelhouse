import React from "react";

const EnvironmentsDashboard = props => {
  return (
    <div className="environments-dashboard-container">
      <p className="top-env-header">
        <span className="bold">Current CSATS DB URL:</span> {props.currentDbUrl}
      </p>
      <p className="bold">All DBs:</p>
      <ul>
        {props.allDbUrls}
      </ul>
      <p className="top-env-header">
        <span className="bold">Current Streamplace Server:</span>
        {" "}
        {props.currentServer}
      </p>
      <p className="bold">All servers:</p>
      <ul>
        {props.allServers}
      </ul>
    </div>
  );
};

export default EnvironmentsDashboard;
