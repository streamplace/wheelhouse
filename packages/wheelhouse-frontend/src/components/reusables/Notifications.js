import React, { Component } from "react";
import { connect } from "react-redux";
import NotificationSystem from "react-notification-system";
import "./Notifications.css";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this._notificationSystem = null;
    // this.seenNotifications = new Set();
  }

  // componentWillReceiveProps({ notifications }) {
  //   notifications.forEach(notification => {
  //     if (!this.seenNotifications.has(notification)) {
  //       // show notification
  //       this.seenNotifications.add(notification);
  //     }
  //   });
  // }

  _addNotification() {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: "Notification message",
      level: "error"
    });
  }

  //need to find a way to change visible to false after it's been shown
  componentWillReceiveProps() {
    if (this.props.notifications) {
      this.props.notifications.map(notification => {
        if (notification.visible) {
          return this._notificationSystem.addNotification({
            message: notification.message,
            level: "success"
          });
        }
      });
    }
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
    showNotification: state.server.showNotification,
    notifications: state.server.notifications
  };
};

export default connect(mapStateToProps)(Notifications);
