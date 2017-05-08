import React, { Component } from "react";
import "./Notifications.css";

class Notifications extends Component {
  constructor() {
    super();
    this.state = {};
  }

  closeNotification() {}

  render() {
    return (
      <div className="notifications-container">
        <button
          onClick={this.closeNotification.bind(this)}
          className="button-clear close-notification-button"
        >
          X
        </button>
        Hey I'm a notification
      </div>
    );
  }
}

export default Notifications;
