import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../reusables/Sidebar";
import Table from "../reusables/Table";
import * as podHandlers from "../../handlers/component-handlers/pod-handlers";

class PodsDataDisplay extends Component {
  render() {
    const { pods } = this.props;
    let appName, ready, status, restarts, age, ipAddress, node;
    let descriptions = [];
    pods.items.forEach((item, idx) => {
      let temp = [];
      appName = item.metadata.name;
      ready = podHandlers.countReadyContainers(item.status.containerStatuses);
      status = item.status.phase;
      restarts = item.status.containerStatuses[0].restartCount;
      age = podHandlers.getContainerAge(item);
      ipAddress = item.status.hostIP;
      node = item.spec.nodeName;
      temp = [appName, ready, status, restarts, age, ipAddress, node];
      descriptions.push(temp);
    });

    const importedDescriptions = podHandlers.populateTableDescriptions(
      descriptions
    );
    const importedHeaders = podHandlers.populateTableHeaders([
      "Name",
      "Ready",
      "Status",
      "Restarts",
      "Age",
      "IP",
      "Node"
    ]);

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="sidebar-container"><Sidebar /></div>
            <div className="content-container">
              <Table
                headers={importedHeaders}
                descriptions={importedDescriptions}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pods: state.kubernetes.pods
  };
};

export default connect(mapStateToProps)(PodsDataDisplay);
