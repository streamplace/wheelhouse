import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "./Sidebar"; 
import Table from "./Table"; 

const populateTableHeaders = (array) => {
  return array.map((header, idx) => {
    return (
      <th key={idx}>{header}</th>
    );
  });
};

const populateTableDescriptions = (array) => {
  return array.map((description, idx) => {
    return (
      <tr key={idx}>
        <td key={idx}>{description}</td>
      </tr>
    );
  });
};

/*eslint-disable react/prop-types*/
class App extends Component {
  render() {     
    const { pods } = this.props;
    const appNames = pods.items.map((item, idx) => {
      return item.metadata.generateName; 
    }).filter(name => name !== undefined);
    const importedDescriptions = populateTableDescriptions(appNames);
    const importedHeaders = populateTableHeaders(["Name/Node"]); 

    return (
      <div>
        <h1 className="app-header">Wheelhouse</h1>
        <div className="container">
          <div className="row">
            <div className="column"><Sidebar /></div>
            <div className="column column-75">
              <Table 
                headers={importedHeaders}
                descriptions={importedDescriptions} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pods: state.pods
  };
};

export default connect(mapStateToProps)(App);
