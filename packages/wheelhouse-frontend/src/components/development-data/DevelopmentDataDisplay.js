import React, { Component } from "react";
import { connect } from "react-redux";
import DataContainer from "../reusables/DataContainer";
import * as logHandlers from "../../handlers/component-handlers/log-handlers";
import LogContainer from "../reusables/LogContainer";
import LogLine from "../reusables/LogLine";
import Sidebar from "../reusables/Sidebar";
import "./DevelopmentData.css";
import { PACKAGES_RUN } from "wheelhouse-core";

class DevelopmentDataDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLogs: {},
    };
    this.changeAppStatus = this.changeAppStatus.bind(this);
    this.showLogs = this.showLogs.bind(this);
  }

  changeAppStatus(pkgName, status) {
    this.props.dispatch({
      type: PACKAGES_RUN,
      package: pkgName,
      status: status
    });
  }

  showLogs(appName) {
    this.setState({
      showLogs: {
        ...this.state.showLogs,
        [appName]: !this.state.showLogs[appName]
      }
    });
    return appName;
  }

  render() {

    const { packages, logs } = this.props;

    const grabIndividualAppLogs = (appName) => {
      return logs.filter(log => {
        return log.appName === appName;
      }).map((specificLog, idx) => {
        const time = logHandlers.timeConverter(specificLog.date);
        const hashed = logHandlers.hashCode(specificLog.appName);
        const randomColor = logHandlers.intToRGB(hashed);
        const textColor = {
          color: randomColor
        };
        return (
          <LogLine
            key={idx}
            timeStamp={time}
            appName={specificLog.appName}
            color={textColor}
            serverStatus={specificLog.serverStatus}
            expectedAction={specificLog.expectedAction}
          />
        );
      });
    };

    const data = packages.map((app, idx) => {

      let buttonLabel = app.active ? "Stop" : "Start";
      let buttonColor = buttonLabel === "Stop" ?  "red" : "green";
      let blockOrNone = !this.state.showLogs[app.name]  ? "none" : null;
      let seeOrCloseLogs = !this.state.showLogs[app.name] ? "See logs" : "Close logs";
      let displayBlockOrNone = {
        display: blockOrNone
      };

      return (
        <div key={idx}>
          <DataContainer
            name={app.name}
            status={app.status}
            startStop={buttonLabel}
            buttonClass={buttonColor}
            changeButtonStatus={this.changeAppStatus.bind(this, app.name, !app.active)}
            showLogsAction={() => this.showLogs(app.name)}
            showLogsText={seeOrCloseLogs}
          />
          <LogContainer
            visibility={displayBlockOrNone}
            lines={grabIndividualAppLogs(app.name)}
           />
        </div>
      );
    });

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="sidebar-container"><Sidebar /></div>
            <div className="development-data-container content-container">{data}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    packages: state.development.packages,
    logs: state.development.logs
  };
};

export default connect(mapStateToProps)(DevelopmentDataDisplay);
