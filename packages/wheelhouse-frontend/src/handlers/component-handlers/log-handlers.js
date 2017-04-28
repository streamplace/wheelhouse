
export const hashCode = (str) => { 
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}; 

export const _makeBrighter = (hex) => {
  hex = hex.split(""); 
  hex[1] = "F"; 
  return hex.join("");
};

export const intToRGB = (i) => {
  var offLimits = /[0-9a-e]/ig;
  var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
  c = "#" +"00000".substring(0, 6 - c.length) + c;
  return c[1].match(offLimits) ? _makeBrighter(c) : c;    
};


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

export const timeConverter = () => {
  const a = new Date();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  return `${month} ${date} ${hour}:${min}:${sec}`;
};
