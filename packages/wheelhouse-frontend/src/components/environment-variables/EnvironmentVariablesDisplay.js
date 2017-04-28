import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../reusables/Sidebar";
import "./EnvironmentVariablesDisplay.css";
import { DEVELOPMENT_ENV_CHANGE } from "wheelhouse-core";

class EnvironmentVariablesDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  buttonClick(name, selectedValue) {
    this.props.dispatch({
      type: DEVELOPMENT_ENV_CHANGE,
      variableName: name,
      currentValue: selectedValue
    });
  }

  render() {
    const { env } = this.props;
    const variable = Object.keys(env).map((name) => {
      const data = env[name];
      const presetValues = data.presetValues;
      const reformattedArray = presetValues.map((obj) => {
        return (
          <button className="button" onClick={this.buttonClick.bind(this, name, obj.value)}>
            <div className="buttonText">
              {obj.name}: {obj.value}
            </div>
          </button>
        );
      });
      return (
        <div> {name}
          <ul> {reformattedArray} </ul>
        </div>
      );
    });
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="column column-20"><Sidebar /></div>
            <div className="environment-variable-container column column-40">
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

