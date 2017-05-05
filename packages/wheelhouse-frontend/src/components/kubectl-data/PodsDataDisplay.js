import React, { Component } from "react";
import { connect } from "react-redux";
import { KUBERNETES_DELETE_POD } from "wheelhouse-core";
import Dropdown from "../reusables/Dropdown";
import Sidebar from "../reusables/Sidebar";
import Table from "../reusables/Table";
import * as podHandlers from "../../handlers/component-handlers/pod-handlers";

class PodsDataDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "select"
    };
  }

  deletePod(appName) {
    this.props.dispatch({
      type: KUBERNETES_DELETE_POD,
      appName
    });
  }

  render() {
    const { pods } = this.props;
    let appName, ready, status, restarts, age, ipAddress, node, action;
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
      action = (
        <Dropdown
          children={
            <button
              className="action-item-button button-clear"
              onClick={this.deletePod.bind(this, appName)}
            >
              Delete
            </button>
          }
        />
      );
      temp = [appName, ready, status, restarts, age, ipAddress, node, action];
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
      "Node",
      "Actions"
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
