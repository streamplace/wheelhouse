import React from "react";

const LogContainer = (props) => {
  return (
    <div style={props.visibility} className="content-container logs-container">{props.lines}</div>
  );
};

export default LogContainer;
