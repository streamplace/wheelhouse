import React from "react";

const DataContainer = props => {
  return (
    <div className="container">
      <div className="row container-row">
        <div className="column text-column">{props.name}</div>
        <div className="column text-column">{props.status}</div>
        <div className="column text-column">
          <a onClick={props.showLogsAction}>{props.showLogsText}</a>
        </div>
        <div className="column">
          <button
            className={props.buttonClass}
            onClick={props.changeButtonStatus}
          >
            {props.startStop}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataContainer;
