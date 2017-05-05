import React, { Component } from "react";
import { connect } from "react-redux";
import LogContainer from "../reusables/LogContainer";
import LogFilterContainer from "../reusables/LogFilterContainer";
import "../reusables/Logs.css";

class LogsDataDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogs: {}
    };
    this.toggleIndivApp = this.toggleIndivApp.bind(this);
  }

  componentDidMount() {
    this.componentWillReceiveProps();
  }

  componentWillReceiveProps() {
    let showLogsCopy = Object.assign({}, this.state.showLogs);
    this.props.logs.forEach(log => {
      if (showLogsCopy[log.appName] === undefined) {
        showLogsCopy[log.appName] = true;
      }
    });
    this.setState({
      showLogs: showLogsCopy
    });
  }

  toggleIndivApp(appName) {
    this.setState({
      showLogs: {
        ...this.state.showLogs,
        [appName]: !this.state.showLogs[appName]
      }
    });
  }

  toggleAllApps(bool) {
    let showLogsCopy = Object.assign({}, this.state.showLogs);
    for (let key in showLogsCopy) {
      showLogsCopy[key] = bool;
    }
    this.setState({
      showLogs: showLogsCopy
    });
  }

  render() {
    const logButtons = () => {
      const buttons = [];

      for (let key in this.state.showLogs) {
        let buttonClass = !this.state.showLogs[key]
          ? "button-outline hide-log-button log-filter-button"
          : "log-filter-button";
        buttons.push(
          <li key={key}>
            <button
              onClick={() => {
                this.toggleIndivApp(key);
              }}
              className={buttonClass}
            >
              {key}
            </button>
          </li>
        );
      }
      return buttons;
    };

    return (
      <div>
        <LogFilterContainer
          logButtons={logButtons()}
          showAll={this.toggleAllApps.bind(this, true)}
          hideAll={this.toggleAllApps.bind(this, false)}
        />
        <LogContainer filter={this.state.showLogs} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logs: state.development.logs
  };
};

export default connect(mapStateToProps)(LogsDataDisplay);
