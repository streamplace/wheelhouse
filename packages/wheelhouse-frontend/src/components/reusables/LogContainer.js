import React, { Component } from "react";
import { connect } from "react-redux";
import LogLine from "./LogLine";
import { timeConverter } from "../../handlers/component-handlers/log-handlers";
import { getColor } from "wheelhouse-core";

class LogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldStick: true,
      atTheBottom: true
    };
    this.stickToBottom = this.stickToBottom.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.shouldStick) {
      if (
        Math.abs(
          this.container.scrollTop +
            this.container.clientHeight -
            this.container.scrollHeight
        ) < 5
      ) {
        this.setState({
          shouldStick: true,
          atTheBottom: true
        });
        this.stickToBottom();
      }
      return;
    }
    this.stickToBottom();
  }

  stickToBottom() {
    this.iAmScrolling = true;
    this.container.scrollTop = this.container.scrollHeight;
    setTimeout(() => {
      this.iAmScrolling = false;
    }, 0);
  }

  stickyScrolling() {
    if (this.iAmScrolling) {
      this.setState({
        shouldStick: true,
        atTheBottom: true
      });
    } else {
      this.setState({
        shouldStick: false,
        atTheBottom: false
      });
    }
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

    const scrollToBottomButton = !this.state.atTheBottom
      ? <button
          className="scroll-to-bottom-button"
          onClick={this.stickToBottom.bind(this)}
        >
          ↓
        </button>
      : null;

    return (
      <div className="outer-logs-container">
        <div
          ref={container => (this.container = container)}
          style={this.props.visibility}
          onScroll={this.stickyScrolling.bind(this)}
          className="content-container inner-logs-container"
        >
          {lines}
        </div>
        {scrollToBottomButton}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    logs: state.development.logs.filter(line => {
      return props.filter[line.appName] === true;
    })
  };
};

export default connect(mapStateToProps)(LogContainer);
