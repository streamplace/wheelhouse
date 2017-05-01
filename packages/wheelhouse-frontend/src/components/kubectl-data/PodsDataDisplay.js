import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../reusables/Sidebar"; 
import Table from "../reusables/Table"; 
import * as podHandlers from "../../handlers/component-handlers/pod-handlers";

const populateTableHeaders = (array) => {
  return array.map((header, idx) => {
    return (
      <th key={idx}>{header}</th>
    );
  });
};

const populateTableDescriptions = (array) => {
  let results = []; 
  for (let i = 0; i<array.length; i++) {
    results.push(<tr key={i}></tr>);
    for (let j = 0; j<array[i].length; j++) {
      let description = array[i][j];
      results.push(<td>{description}</td>);
    }
  }
  return results;
};


class PodsDataDisplay extends Component {
  render() {     
    const { pods } = this.props;
    let appName, ready, status, restarts, age, ipAddress, node; 
    let results = [];
    pods.items.forEach((item, idx) => {
      let temp = []; 
      if (!item.metadata.labels) {
        appName = "n/a";
      } 
      else {
        appName = item.metadata.labels.app;
      }
      ready = podHandlers.countReadyContainers(item.status.containerStatuses);
      status = item.status.phase;
      restarts = item.status.containerStatuses[0].restartCount;
      age = podHandlers.getContainerAge(item);
      ipAddress = item.status.hostIP;
      node= item.spec.nodeName;
      temp = [appName, ready, status, restarts, age, ipAddress, node];
      results.push(temp);  
    });

    const importedDescriptions = populateTableDescriptions(results);
    const importedHeaders = populateTableHeaders(["Name", "Ready", "Status", "Restarts", "Age", "IP", "Node"]); 

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
