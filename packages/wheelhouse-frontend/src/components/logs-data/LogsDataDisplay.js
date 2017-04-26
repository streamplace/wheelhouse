import React, {Component} from "react"; 
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

const logsData = [
  {
    "appName": "Maestro", 
    "serverStatus": "k85_sp-dev-certs.8cffccc.kube-apiserver",
    "expectedAction": "[17.015ms] About to convert to expected version"
  },
  {
    "appName": "Mendoza", 
    "serverStatus": "k85_sp-dev-certs.8cffccc.kube-apiserver",
    "expectedAction": "[17.015ms] About to convert to expected version"
  },
  {
    "appName": "Clydesdale", 
    "serverStatus": "k85_sp-dev-certs.8cffccc.kube-apiserver",
    "expectedAction": "[17.015ms] About to convert to expected version"
  }
];


class LogsDataDisplay extends Component {
  render() {
    let lines = logsData.map((line, idx) => {
      let time = timeConverter(); 
      return (
        <LogLine
          key={idx} 
          timeStamp={time}
          appName={line.appName}
          serverStatus={line.serverStatus}
          expectedAction={line.expectedAction}
        />
      );
    });
  
    return (
      <div className="container">
        <div className="row">
          <div className="column column-20"><Sidebar /></div>
          <div className="column column-80 logs-container">{lines}</div>
        </div>
      </div>
    );
  }
}

export default LogsDataDisplay; 
