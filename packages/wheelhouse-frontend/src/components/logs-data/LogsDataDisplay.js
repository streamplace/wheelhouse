import React, {Component} from "react"; 
import { connect } from "react-redux";
import { DEVELOPMENT_LOG } from "wheelhouse-core"; 
import LogLine from "./LogLine";
import * as logHandlers from "../../handlers/component-handlers/log-handlers";
import Sidebar from "../reusables/Sidebar";
import ToggleButton from "react-toggle-button";
import "../reusables/Logs.css";

class LogsDataDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLogs: {}
    }; 
    this.toggleButton = this.toggleButton.bind(this);
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

  // componentDidUpdate() {
  //   this.props.logs.map(log => {
  //     if (this.state.showLogs[log.appName] === undefined) {
  //       this.setState({
  //         showLogs: {
  //           ...this.state.showLogs,
  //           [log.appName]: true
  //         } 
  //       });
  //     }
  //   });
  // }

  componentDidMount() {
    setInterval(this.addLogData.bind(this), 3000);
  }
  
  addLogData() {
    this.props.dispatch({
      type: DEVELOPMENT_LOG
    });
  }

  toggleButton(appName) {
    this.setState({
      showLogs: {
        ...this.state.showLogs, 
        [appName]: !this.state.showLogs[appName]
      }
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
        buttons.push(
            <li key={key}>
              {key} 
              <ToggleButton
              value={this.state.showLogs[key]}
              onToggle={() => {this.toggleButton(key); }}
              />
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

