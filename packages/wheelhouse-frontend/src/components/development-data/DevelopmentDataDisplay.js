import React, { Component } from "react";
import { connect } from "react-redux";
import DataContainer from "../reusables/DataContainer";
import LogContainer from "../reusables/LogContainer";
import "./DevelopmentData.css";
import { PACKAGES_RUN } from "wheelhouse-core";

class DevelopmentDataDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogs: {}
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
    const { packages } = this.props;
    const data = packages.map((app, idx) => {
      const showLogs = this.state.showLogs[app.name];
      let buttonLabel = app.active ? "Stop" : "Start";
      let buttonColor = buttonLabel === "Stop" ? "red" : "green";
      let seeOrCloseLogs = !showLogs ? "See logs" : "Close logs";

      return (
        <div key={idx}>
          <DataContainer
            name={app.name}
            status={app.status}
            startStop={buttonLabel}
            buttonClass={buttonColor}
            changeButtonStatus={this.changeAppStatus.bind(
              this,
              app.name,
              !app.active
            )}
            showLogsAction={() => this.showLogs(app.name)}
            showLogsText={seeOrCloseLogs}
          />
          {showLogs && <LogContainer filter={{ [app.name]: true }} />}
        </div>
      );
    });

    return (
      <div className="development-data-container content-container">
        {data}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    packages: state.development.packages,
    logs: state.development.logs,
    pods: state.kubernetes.pods
  };
};

export default connect(mapStateToProps)(DevelopmentDataDisplay);
