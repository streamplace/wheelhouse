import React, {Component} from "react"; 
import { connect } from "react-redux";
import { DEVELOPMENT_LOG } from "wheelhouse-core"; 
import LogLine from "./LogLine";
import * as logHandlers from "../../handlers/component-handlers/log-handlers";
import Sidebar from "../reusables/Sidebar";
import "../reusables/Logs.css";

class LogsDataDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLogs: {}
    }; 
    this.toggleIndivApp = this.toggleIndivApp.bind(this);
  }

  componentWillMount() {
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

  componentDidUpdate() {
    // let showLogsCopy = Object.assign({}, this.state.showLogs);
    // this.props.logs.forEach(log => {
    //   if (showLogsCopy[log.appName] === undefined) {
    //     showLogsCopy[log.appName] = true; 
    //   }
    // });
    // this.setState({
    //   showLogs: showLogsCopy
    // });
  }

  componentDidMount() {
    setInterval(this.addLogData.bind(this), 3000);
  }
  
  addLogData() {
    this.props.dispatch({
      type: DEVELOPMENT_LOG
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

  hideAllApps() {
    let showLogsCopy = Object.assign({}, this.state.showLogs);
    for (let key in showLogsCopy) {
      showLogsCopy[key] = false; 
    }
    this.setState({
      showLogs: showLogsCopy 
    });
  }

  showAllApps() {
    let showLogsCopy = Object.assign({}, this.state.showLogs);
    for (let key in showLogsCopy) {
      showLogsCopy[key] = true; 
    }
    this.setState({
      showLogs: showLogsCopy 
    });
  }

  render() {
    const { logs } = this.props;
    const lines = logs.map((line, idx) => {

      const time = logHandlers.timeConverter();
      const hashed = logHandlers.hashCode(line.appName);
      const randomColor = logHandlers.intToRGB(hashed);

      let blockOrNone;
      this.state.showLogs[line.appName] ? blockOrNone = null : blockOrNone = "none";

      const textColor = {
        color: randomColor
      };

      const displayBlockOrNone = {
        display: blockOrNone
      };

      return (
        <LogLine
          key={idx} 
          timeStamp={time}
          appName={line.appName}
          color={textColor}
          serverStatus={line.serverStatus}
          expectedAction={line.expectedAction}
          display={displayBlockOrNone}
        />
      );
    });

    const logButtons = () => {
      const buttons = []; 

      for (let key in this.state.showLogs) {
        let buttonClass= !this.state.showLogs[key] ? "button-outline hide-log-button log-filter-button" : "log-filter-button";
        buttons.push(
            <li key={key}>
              <button 
                onClick={() => {this.toggleIndivApp(key); }}
                className={buttonClass}>
                {key}
              </button>
            </li>
          ); 
      }
      return buttons;
    };

    return (
      <div className="container">
        <div className="row">
          <div className="sidebar-container">
            <Sidebar />
            <div className="log-filter-container">
              <ul className="log-filter-list">
                <button onClick={this.showAllApps.bind(this)} className="button-clear">Show all</button>
                <button onClick={this.hideAllApps.bind(this)}className="button-clear">Hide all</button>
                {logButtons()}
              </ul>
            </div>
          </div>
          <div className="content-container logs-container">{lines}</div>
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

export default connect(mapStateToProps)(LogsDataDisplay);

