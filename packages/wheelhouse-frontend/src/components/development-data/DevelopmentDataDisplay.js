import React, { Component } from "react";
import { connect } from "react-redux";
import DataContainer from "../reusables/DataContainer";
import Logs from "../reusables/Logs";
import Sidebar from "../reusables/Sidebar";
import * as actions from "../../actions/actions";
import "./DevelopmentData.css";

class DevelopmentDataDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLogs: {}
    };
    this.changeButtonStatus = this.changeButtonStatus.bind(this);
    this.showLogs = this.showLogs.bind(this);
  }

  changeButtonStatus(appName) {
    this.props.dispatch(actions.changeButtonStatus(appName));
  }

  showLogs(appName) {
    this.setState({
      showLogs: {
        ...this.state.showLogs,
        [appName]: !this.state.showLogs[appName]
      }
    });
  }

  render() {
    const { packages } = this.props;
    const data = packages.map((app, idx) => {
      let buttonLabel = app.active ? "Stop" : "Start";
      let buttonColor = buttonLabel === "Stop" ?  "red" : "green";
      let showOrHide = this.state.showLogs[app.name] ? "show" : "hide";
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
          <Logs
            name={app.name}
            visibility={showOrHide}
           />
        </div>
      );
    });

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="column column-20"><Sidebar /></div>
            <div className="development-data-container column column-80">{data}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    packages: state.development.packages
  };
};

export default connect(mapStateToProps)(DevelopmentDataDisplay);
