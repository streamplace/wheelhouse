import React from "react"; 

/*eslint-disable react/prop-types*/
const DataContainer = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="column">{props.name}</div>
        <div className="column">{props.status}</div>
        <div className="column">
          <button onClick={props.changeButtonStatus}>
            {props.startStop}
          </button>
        </div>
      </div>
    </div>
  ); 
};

export default DataContainer; 