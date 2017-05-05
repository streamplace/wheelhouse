import React, { Component } from "react";
import "./Dropdown.css";

class Dropdown extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    this.listener = e => {
      this.setState({ show: false });
    };
    document.body.addEventListener("click", this.listener);
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.listener);
  }

  toggle(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div className="dropdown-action-container">
        <button
          className="action-button button-clear"
          onClick={this.toggle.bind(this)}
        >
          {this.props.label}↓
        </button>
        <div
          className="dropdown-floating-menu"
          style={{
            display: this.state.show ? "block" : "none"
          }}
        >
          {this.props.children}
          {this.props.children}
          {this.props.children}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Dropdown;
