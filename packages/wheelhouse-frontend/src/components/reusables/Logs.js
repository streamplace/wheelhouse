import React from "react"; 
import "../../Logs.css";

/*eslint-disable react/prop-types*/
const Logs = (props) => {
  return (
    <div className={props.visibility}>
      <div className="container logs">
        <div className="row">
          <div className="column">Logs for {props.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Logs; 