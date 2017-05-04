import React from "react";

const LogFilterContainer = (props) => {
  return (
    <div className="log-filter-container">
      <div className="show-all-hide-all-container">
        <button className="button-clear toggle-all-apps-button show-all-button"
          onClick={props.showAll}>Show all</button>
        <button className="button-clear toggle-all-apps-button"
          onClick={props.hideAll}>Hide all</button>
      </div>
      <ul className="log-filter-list">
        {props.logButtons}
      </ul>
    </div>
  );
};

export default LogFilterContainer;
