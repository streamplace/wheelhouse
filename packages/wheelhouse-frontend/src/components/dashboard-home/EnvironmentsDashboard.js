import React from "react";

const EnvironmentsDashboard = props => {
  return (
    <div className="environments-dashboard-container">
      <h5>Current CSATS DB URL:</h5>
      <p>{props.currentDbUrl}</p>
      <ul>
        {props.allDbUrls}
      </ul>
      <h5>Current Streamplace Server:</h5>
      <p>{props.currentServer}</p>
      <ul>
        {props.allServers}
      </ul>
    </div>
  );
};

export default EnvironmentsDashboard;
