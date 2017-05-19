import React from "react";
import leftPad from "left-pad";

export const recordAppNamesInState = () => {
  let showLogsCopy = Object.assign({}, this.state.showLogs);
  this.props.logs.forEach(log => {
    if (showLogsCopy[log.appName] === undefined) {
      showLogsCopy[log.appName] = true;
    }
  });
  this.setState({
    showLogs: showLogsCopy
  });
};

export const timeConverter = a => {
  a = new Date(a);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = leftPad(a.getHours(), 2, "0");
  const min = leftPad(a.getMinutes(), 2, "0");
  const sec = leftPad(a.getSeconds(), 2, "0");
  return `${month} ${date} ${hour}:${min}:${sec}`;
};

export const createLogLink = log => {
  log = log.split(" ");
  let link;
  log.forEach(word => {
    if (word.includes("http://localhost:")) {
      link = word;
    }
  });

  return (
    <span>
      {" "}=&gt; App is running at:
      {" "}
      <a className="log-link" href={link} target="_blank">
        {link}
      </a>
    </span>
  );
};
