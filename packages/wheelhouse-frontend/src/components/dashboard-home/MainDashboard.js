import React, { Component } from "react";
import LogContainer from "../reusables/LogContainer";
import EnvironmentsDashboard from "./EnvironmentsDashboard";
import {
  createList
} from "../../handlers/component-handlers/environment-handlers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
    const allDbs = createList(this.props.env.CSATS_DB_URL.presetValues);

    const allServs = createList(
      this.props.env.STREAMPLACE_API_SERVER.presetValues
    );

    const logStyles = {
      margin: "0",
      width: "100%",
      height: "85vh"
    };
    return (
      <div className="main-dashboard-container">
        <div className="left-column">
          <div className="left-top">
            development
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
    env: state.development.env
  };
};

export default connect(mapStateToProps)(Dashboard);
