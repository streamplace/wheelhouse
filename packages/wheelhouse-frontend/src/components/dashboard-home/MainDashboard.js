import React, { Component } from "react";
import LogContainer from "../reusables/LogContainer";
import EnvironmentsDashboard from "./EnvironmentsDashboard";
import {
  createList
} from "../../handlers/component-handlers/environment-handlers";
import {
  notReadyContainers
} from "../../handlers/component-handlers/pod-handlers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import wheel from "../../../public/assets/wheel.png";
import house from "../../../public/assets/house.png";
import success from "../../../public/assets/success.png";
import error from "../../../public/assets/error.png";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogs: {}
    };
  }

  componentWillReceiveProps(props) {
    props.logs.forEach(log => {
      if (!this.state.showLogs[log.appName]) {
        this.setState({
          showLogs: {
            ...this.state.showLogs,
            [log.appName]: true
          }
        });
      }
    });
  }

  render() {
    const { pods } = this.props;
    let allDbs, allServs, notReady;

    if (pods) {
      allDbs = createList(this.props.env.CSATS_DB_URL.presetValues);
      allServs = createList(this.props.env.STREAMPLACE_API_SERVER.presetValues);

      pods.items.forEach(pod => {
        notReady = notReadyContainers(pod.status.containerStatuses);
      });
    }

    const logStyles = {
      margin: "0",
      width: "100%",
      height: "85vh"
    };

    let podImage;

    if (notReady.length > 0) {
      podImage = (
        <img alt="pods not ready" className="pod-status-image" src={error} />
      );
    } else {
      podImage = (
        <img alt="pods ready" className="pod-status-image" src={success} />
      );
    }

    return (
      <div className="main-dashboard-container">
        <div className="left-column">
          <div className="left-top">
            <img className="wheel-icon rotating" alt="house" src={wheel} />
            <img className="house-icon" alt="house" src={house} />
          </div>
          <div className="left-middle">
            <Link to="/pods">Pods</Link>
            {podImage}
            {notReady.length > 0 ? notReady : "All pods are ready."}
          </div>
          <div className="left-bottom">
            <Link to="/environment-variables">Environment Variables</Link>
            <EnvironmentsDashboard
              currentDbUrl={this.props.env.CSATS_DB_URL.currentValue}
              allDbUrls={allDbs}
              currentServer={this.props.env.STREAMPLACE_API_SERVER.currentValue}
              allServers={allServs}
            />
          </div>
        </div>
        <div className="right-column">
          <Link to="/logs">Logs</Link>
          <LogContainer filter={this.state.showLogs} customStyles={logStyles} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logs: state.development.logs,
    env: state.development.env,
    pods: state.kubernetes.pods
  };
};

export default connect(mapStateToProps)(Dashboard);
