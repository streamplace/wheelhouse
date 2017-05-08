import React, { Component } from "react";
import { connect } from "react-redux";
import NotificationSystem from "react-notification-system";
import "./Notifications.css";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this._notificationSystem = null;
  }

  componentWillReceiveProps() {
    if (this.props.notifications) {
      this.props.notifications.map(notification => {
        if (notification.visible) {
          notification.visible = false;
          const message = `${notification.date}: ${notification.message}`;
          return this._notificationSystem.addNotification({
            message: message,
            level: "error"
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
