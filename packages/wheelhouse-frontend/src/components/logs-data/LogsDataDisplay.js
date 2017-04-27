import React, {Component} from "react"; 
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import LogLine from "./LogLine";
import Sidebar from "../reusables/Sidebar";
import "../reusables/Logs.css";

function timeConverter() {
  const a = new Date();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  return `${month} ${date} ${hour}:${min}:${sec}`;
}

function hashCode(str) { 
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
} 

function makeBrighter(hex) {
  hex = hex.split(""); 
  hex[1] = "F"; 
  return hex.join("");
}

function intToRGB(i){
  var offLimits = /[0-9a-e]/ig;
  var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
 
  c = "#" +"00000".substring(0, 6 - c.length) + c;
  return c[1].match(offLimits) ? makeBrighter(c) : c; 
    
}

class LogsDataDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logsData: [ { appName: "Mendoza",
        serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
        expectedAction: "[17.015ms] About to convert to expected version" },
      { appName: "Clydesdale",
        serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
        expectedAction: "[17.015ms] About to convert to expected version" },
      { appName: "Maestro",
        serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
        expectedAction: "[17.015ms] About to convert to expected version" }]
    };
  }

  componentDidMount() {
    setInterval(this.addLogData.bind(this), 3000);
  }
  
  addLogData(logsData) {
    this.props.dispatch(actions.addLog());
  }

  render() {
    const { logsData } = this.props;
    let lines = logsData.map((line, idx) => {
      let time = timeConverter();
      let hashed = hashCode(line.appName);
      let randomColor = intToRGB(hashed); 
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
