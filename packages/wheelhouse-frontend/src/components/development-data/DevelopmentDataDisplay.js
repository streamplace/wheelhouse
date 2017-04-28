import React, { Component } from "react";
import { connect } from "react-redux";
import DataContainer from "../reusables/DataContainer";
import { DEVELOPMENT_LOG } from "wheelhouse-core"; 
import * as logHandlers from "../../handlers/component-handlers/log-handlers";
import LogContainer from "../reusables/LogContainer";
import LogLine from "../reusables/LogLine"; 
import Sidebar from "../reusables/Sidebar";
import "./DevelopmentData.css";
import { CONFIG_LOAD, CHANGE_BUTTON_STATUS } from "wheelhouse-core";

class DevelopmentDataDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLogs: {}, 
      appSpecificLogs: []
    };
    this.changeButtonStatus = this.changeButtonStatus.bind(this);
    this.showLogs = this.showLogs.bind(this);
  }

  componentDidMount() {
    setInterval(this.addLogData.bind(this), 3000);
  }
  
  addLogData() {
    this.props.dispatch({
      type: DEVELOPMENT_LOG
    });
  }

  changeButtonStatus(appName) {
    this.props.dispatch({
      type: CHANGE_BUTTON_STATUS,
      name: appName
    });
  }

  showLogs(appName) {
    let individualAppLogs = this.props.logs.filter(log => {
      return log.appName === appName; 
    }).map((specificLog, idx) => {
      const time = logHandlers.timeConverter();
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

    this.setState({
      showLogs: {
        ...this.state.showLogs,
        [appName]: !this.state.showLogs[appName]
      }, 
      appSpecificLogs: individualAppLogs
    });
  }

  render() {
    const { packages } = this.props;
    const data = packages.map((app, idx) => {
      let buttonLabel = app.active ? "Stop" : "Start";
      let buttonColor = buttonLabel === "Stop" ?  "red" : "green";
      let blockOrNone;  
      !this.state.showLogs[app.name]  ? blockOrNone = "none" : blockOrNone = null;
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
            changeButtonStatus={() => this.changeButtonStatus(app.name)}
            showLogs={() => this.showLogs(app.name)}
          />
          <LogContainer
            visibility={displayBlockOrNone}
            lines={this.state.appSpecificLogs}
           />
        </div>
      );
    });

    return (
      <div>
        <button className="start-stop-button"onClick={() => this.props.dispatch({type: CONFIG_LOAD})}>Reload Config</button>
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
