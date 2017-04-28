import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../reusables/Sidebar";
//import * as actions from "../../actions/actions";
import "./EnvironmentVariablesDisplay.css";

class EnvironmentVariablesDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
//currentValue set as state?

  // buttonClick() {
  //   this.setState({currentValue: ""});
  // }
  //set currentValue (for correct variable) to bound "this"
  //bind obj.value as this onClick
  render() {
    const { env } = this.props;
    const variable = Object.keys(env).map((name) => {
      const data = env[name];
      const presetValues = data.presetValues;
      const reformattedArray = presetValues.map(function(obj) {
        return (
          <button className="button" >
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

//onClick={addCheckmark}
