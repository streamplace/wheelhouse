import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../reusables/Sidebar"; 
import Table from "../reusables/Table"; 

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

class PodsDataDisplay extends Component {
  render() {     
    const { pods } = this.props;
    const appNames = pods.items.map((item, idx) => {
      return item.metadata.generateName; 
    }).filter(name => name !== undefined);
    const importedDescriptions = populateTableDescriptions(appNames);
    const importedHeaders = populateTableHeaders(["Name/Node"]); 

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="sidebar-container"><Sidebar /></div>
            <div className="content-container">
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
    pods: state.development.pods
  };
};

export default connect(mapStateToProps)(PodsDataDisplay);
