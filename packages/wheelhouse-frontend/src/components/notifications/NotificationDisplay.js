import React from "react";
import { connect } from "react-redux";
import Sidebar from "../reusables/Sidebar";
import { NOTIFICATION_TEXT_SEND } from "wheelhouse-core";

class NotificationDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      to: "",
      body: ""
    };
  }

  handleSubmit(event) {
    // alert('A number was submitted: ' + this.state.to +
    //   ' and its message was: ' + this.state.body);

    this.props.dispatch({
      type: NOTIFICATION_TEXT_SEND,
      to: this.state.to,
      body: this.state.body
    });
    event.preventDefault();
  }
  numberChange(event) {
    this.setState({ to: event.target.value });
  }
  messageChange(event) {
    this.setState({ body: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="column column-20"><Sidebar /></div>
          <div>
            <form id="number">
              <p>Enter phone number (requires country code, +1 for US)</p>
              <input
                type="text"
                name="to"
                placeholder="12062070099"
                onKeyUp={this.numberChange.bind(this)}
              />
              <input
                type="text"
                name="body"
                placeholder="enter your message"
                onKeyUp={this.messageChange.bind(this)}
              />
              <button onClick={this.handleSubmit.bind(this)}>
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(NotificationDisplay);
