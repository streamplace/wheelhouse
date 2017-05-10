import React, { Component } from "react";
import LogContainer from "../reusables/LogContainer";
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
    const logStyles = {
      margin: "0",
      width: "100%",
      height: "85vh"
    };
    return (
      <div className="dashboard-container">
        <div className="left-column">
          <div className="left-top">
            development
          </div>
          <div className="left-bottom">
            environment variables
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
    logs: state.development.logs
  };
};

export default connect(mapStateToProps)(Dashboard);
