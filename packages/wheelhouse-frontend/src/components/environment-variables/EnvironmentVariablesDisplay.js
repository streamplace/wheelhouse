import React, { Component } from "react";
import { connect } from "react-redux";
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

  inputChange(name, event) {
    this.props.dispatch({
      type: DEVELOPMENT_ENV_CHANGE,
      variableName: name,
      currentValue: event.currentTarget.value
    });
  }

  render() {
    const { env } = this.props;
    const variable = Object.keys(env).map(name => {
      const data = env[name];
      const presetValues = data.presetValues;

      let isPresetValue = false;
      const reformattedArray = presetValues.map(obj => {
        let button = obj.value;
        let checked;
        if (button === this.props.env[name].currentValue) {
          isPresetValue = true;
          checked = <span className="checkmark"> ✔️</span>;
        } else {
          checked = <span />;
        }
        return (
          <div key={obj.value}>
            <button
              className="environment-variable-picker-button"
              onClick={this.buttonClick.bind(this, name, obj.value)}
            >
              <div className="buttonText">
                {obj.name}: {obj.value}
              </div>
            </button>
            {checked}
          </div>
        );
      });

      let newInputCheck;
      if (!isPresetValue) {
        newInputCheck = <span className="checkmark"> ✔️</span>;
      }
      const newInput = (
        <input
          className="customInput"
          type="text"
          placeholder="custom"
          onKeyUp={this.inputChange.bind(this, name)}
        />
      );

      return (
        <div key={name} className="variable-container">
          <span className="variable-name">{name}</span>
          <div className="envContainer">{reformattedArray}</div>
          <div className="newInput">
            {newInput}
            {newInputCheck}
          </div>
        </div>
      );
    });
    return (
      <div className="environment-variable-container column column-80">
        {variable}
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
