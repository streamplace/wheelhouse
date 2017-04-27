import React, {Component} from "react"; 
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import LogLine from "./LogLine";
import * as logHandlers from "../../handlers/component-handlers/log-handlers";
import Sidebar from "../reusables/Sidebar";
import "../reusables/Logs.css";

class LogsDataDisplay extends Component {

  componentDidMount() {
    setInterval(this.addLogData.bind(this), 3000);
  }
  
  addLogData(logsData) {
    this.props.dispatch(actions.addLog());
  }

  render() {
    const { logsData } = this.props;
    const lines = logsData.map((line, idx) => {
      const time = logHandlers.timeConverter();
      const hashed = logHandlers.hashCode(line.appName);
      const randomColor = logHandlers.intToRGB(hashed); 
      const divStyle = {
        color: randomColor
      };
      return (
        <LogLine
          key={idx} 
          timeStamp={time}
          appName={line.appName}
          customStyle={divStyle}
          serverStatus={line.serverStatus}
          expectedAction={line.expectedAction}
        />
      );
    });
  
    return (
      <div className="container">
        <div className="row">
          <div className="sidebar-container"><Sidebar /></div>
          <div className="content-container logs-container">{lines}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logsData: state.logsData
  };
};

export default connect(mapStateToProps)(LogsDataDisplay);
