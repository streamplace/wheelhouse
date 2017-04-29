import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../reusables/Sidebar";
import "./EnvironmentVariablesDisplay.css";
import { DEVELOPMENT_ENV_CHANGE } from "wheelhouse-core";

class EnvironmentVariablesDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: "",
    };
  }

  changeCheckmark(checked) {
    this.setState({checked});
  }

  buttonClick(name, selectedValue) {
    this.setState({
      current: selectedValue
    });
    this.props.dispatch({
      type: DEVELOPMENT_ENV_CHANGE,
      variableName: name,
      currentValue: selectedValue
    });
  }

  inputChange(name, event) {
    this.setState({
      current: event.currentTarget.value
    });
    this.props.dispatch({
      type: DEVELOPMENT_ENV_CHANGE,
      variableName: name,
      currentValue: event.currentTarget.value
    });
  }

  render() {
    const { env } = this.props;
    const variable = Object.keys(env).map((name) => {
      const data = env[name];
      const presetValues = data.presetValues;
      const newInput = <input
        className="customInput"
        type="text"
        placeholder="custom"
        onKeyUp={this.inputChange.bind(this, name)}>
      </input>;

      const reformattedArray = presetValues.map((obj) => {
        let button = obj.value;
        let checked;
        if (button == this.state.current) {
          checked = <span className="checkmark">  ✔️</span>;
        } else {
          checked = <span></span>;
        }
        return (
          <button className="button"
            onClick={this.buttonClick.bind(this, name, obj.value)}
          >
            <div className="buttonText">
              {obj.name}: {obj.value}
              {checked}
            </div>
          </button>
        );
      });
      return (
        <div className="variable-container">
          <span className="variable-name">{name}</span>
          <ul> {reformattedArray} </ul>
          {newInput}
        </div>
      );
    });
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="column column-20"><Sidebar /></div>
            <div className="environment-variable-container column column-80">
              {variable}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    env: state.development.env
  };
};

export default connect(mapStateToProps)(EnvironmentVariablesDisplay);


