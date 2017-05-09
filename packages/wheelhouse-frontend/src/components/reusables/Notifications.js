import React, { Component } from "react";
import { connect } from "react-redux";
import { SERVER_ACKNOWLEDGE_NOTIFICATION } from "wheelhouse-core";
import NotificationSystem from "react-notification-system";
import "./Notifications.css";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this._notificationSystem = null;
    this.shown = new Set();
  }

  componentWillReceiveProps(props) {
    if (props.notifications) {
      props.notifications.forEach(notification => {
        if (notification.visible && !this.shown.has(notification.uid)) {
          this.shown.add(notification.uid);
          this.props.dispatch({
            type: SERVER_ACKNOWLEDGE_NOTIFICATION,
            uid: notification.uid
          });
          const message = `${notification.date}: ${notification.message}`;
          this._notificationSystem.addNotification({
            message: message,
            level: notification.level
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
