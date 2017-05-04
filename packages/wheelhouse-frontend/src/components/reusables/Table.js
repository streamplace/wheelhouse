import React from "react";
import "./Table.css";

const Table = (props) => {
  return (
    <table className="reusable-table">
      <thead>
        <tr>{props.headers}</tr>
      </thead>
      <tbody>
        {props.descriptions}
      </tbody>
    </table>
  );
};

export default Table;
