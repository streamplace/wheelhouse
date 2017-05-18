import React, { Component } from "react";
import LogContainer from "../reusables/LogContainer";
import EnvironmentsDashboard from "./EnvironmentsDashboard";
import {
  createLabels
} from "../../handlers/component-handlers/environment-handlers";
import {
  notReadyContainers
} from "../../handlers/component-handlers/pod-handlers";
import {
  activeApps
} from "../../handlers/component-handlers/development-handlers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import wheel from "../../../public/assets/wheel.png";
import house from "../../../public/assets/house.png";
import success from "../../../public/assets/success.png";
import error from "../../../public/assets/error.png";
import "./Dashboard.css";

class Dashboard extends Component {
  render() {
    const { pods, packages, env } = this.props;
    let notReady, labels;

    const showLogs = {};
    this.props.packages.forEach(pkgName => (showLogs[pkgName] = true));

    if (pods) {
      labels = createLabels(env);
      pods.items.forEach(pod => {
        notReady = notReadyContainers(pod.status.containerStatuses);
      });
    }

    const logStyles = {
      margin: "0",
      width: "100%"
    };

    let podImage;

    if (notReady && notReady.length > 0) {
      podImage = (
        <img alt="pods not ready" className="pod-status-image" src={error} />
      );
    } else {
      podImage = (
        <img alt="pods ready" className="pod-status-image" src={success} />
      );
    }

    const appStatuses = activeApps(packages);

    return (
      <div className="main-dashboard-container">
        <div className="left-column-container">
          <div className="left-top-container">
            <img className="wheel-icon rotating" alt="house" src={wheel} />
            <img className="house-icon" alt="house" src={house} />
          </div>
          <div className="left-middle-container">
            <div className="left-middle-top left-middle">
              <Link to="/pods">Pods</Link>
              {podImage}
              {notReady.length > 0 ? notReady : <p>All pods are ready.</p>}
            </div>
            <div className="left-middle-bottom left-middle">
              <Link to="/development">Active Applications</Link>
              <ul>
                {appStatuses}
              </ul>
            </div>
          </div>
          <div className="left-bottom-container">
            <Link to="/environment-variables">Environment Variables</Link>
            <EnvironmentsDashboard labels={labels} />
          </div>
        </div>
        <div className="right-column-container">
          <Link to="/logs">Logs</Link>
          <LogContainer showAll customStyles={logStyles} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    env: state.development.env,
    pods: state.kubernetes.pods,
    packages: state.development.packages
  };
};

export default connect(mapStateToProps)(Dashboard);
