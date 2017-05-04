import React from "react";

const LogLine = (props) => {
  return (
    <div className="log-line-container">
      <div className="log-line-row">
        <div className="log-line-column nowrap">{props.timeStamp}</div>
        <div className="log-line-column log-line-app-name nowrap" style={props.customStyle}>{props.appName}</div>
        <div className="log-line-column log-line-app-server nowrap">{props.serverStatus}</div>
        <div className="log-line-column">{props.expectedAction} </div>
      </div>
    </div>
  );
};

export default LogLine; 
