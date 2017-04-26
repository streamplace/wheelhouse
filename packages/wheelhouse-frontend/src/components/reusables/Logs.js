import React from "react"; 

/*eslint-disable react/prop-types*/
const Logs = (props) => {
  return (
    <div className={props.visibility}>
    <div className="container">
      <div className="row">
        <div className="column logs">Logs for {props.name}</div>
      </div>
    </div>
  </div>
  );
};

export default Logs; 