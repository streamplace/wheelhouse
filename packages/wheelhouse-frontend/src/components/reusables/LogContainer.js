import React, {Component} from "react";
import { connect } from "react-redux";
import LogLine from "./LogLine";
import { timeConverter } from "../../handlers/component-handlers/log-handlers";
import { getColor } from "wheelhouse-core";

class LogContainer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { logs } = this.props;
    const lines = logs.map((line, idx) => {
      const textColor = {
        color: getColor(line.appName)
      };

      return (
        <LogLine
          key={line.uid}
          timeStamp={timeConverter(line.date)}
          appName={line.appName}
          color={textColor}
          serverStatus={line.serverStatus}
          expectedAction={line.expectedAction}
        />
      );
    });

    return (
      <div style={this.props.visibility} className="content-container logs-container">{lines}</div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    logs: state.development.logs.filter(line => {
      return props.filter[line.appName] === true;
    }),
  };
};

export default connect(mapStateToProps)(LogContainer);
