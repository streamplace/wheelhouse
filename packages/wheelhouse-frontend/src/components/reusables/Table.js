import React from "react";
import "../../Table.css";

/*eslint-disable react/prop-types*/
const Table = (props) => {
  return (
    <table className="reusable-table">
      <thead>
        <tr> { props.headers } </tr>
      </thead>
      <tbody>
        <tr> { props.descriptions } </tr>
      </tbody>p
    </table>
  );
};

export default Table;
