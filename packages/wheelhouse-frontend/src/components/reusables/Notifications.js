import React, { Component } from "react";
import { connect } from "react-redux";
import NotificationSystem from "react-notification-system";
import "./Notifications.css";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this._notificationSystem = null;
  }

  _addNotification() {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: "Notification message",
      level: "success"
    });
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  render() {
    return (
      <div>
        <button onClick={this._addNotification.bind(this)}>
          Add notification
        </button>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showNotification: state.server.showNotification
  };
};

export default connect(mapStateToProps)(Notifications);
