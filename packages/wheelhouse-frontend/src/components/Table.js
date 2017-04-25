import React, { Component } from "react";
import "../Table.css";

class Table extends Component {
  render() {
    return (
     <table className="reusable-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Height</th>
            <th>Location</th>
          </tr>
      </thead>
    <tbody>
      <tr>
        <td>Stephen Curry</td>
        <td>27</td>
        <td>1,91</td>
        <td>Akron, OH</td>
      </tr>
      <tr>
        <td>Klay Thompson</td>
        <td>25</td>
        <td>2,01</td>
        <td>Los Angeles, CA</td>
      </tr>
    </tbody>
  </table>
    );
  }
}

export default Table;
