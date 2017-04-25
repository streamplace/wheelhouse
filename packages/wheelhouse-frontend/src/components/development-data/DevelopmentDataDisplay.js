import React, { Component } from "react";
import { connect } from "react-redux";
import DataContainer from "../reusables/DataContainer"; 
import Header from "../reusables/Header";
import Sidebar from "../reusables/Sidebar";
import * as actions from "../../actions/actions";
import "../../DevelopmentData.css"; 

/*eslint-disable react/prop-types*/
/*eslint-disable no-console*/
class DevelopmentDataDisplay extends Component {

  construtor() {
    this.changeButtonStatus = this.changeButtonStatus.bind(this); 
  }

  changeButtonStatus(appName) {
    this.props.dispatch(actions.changeButtonStatus(appName));
  }

  render() {

    const { packages } = this.props;
    const data = packages.map((app, idx) => {
      let buttonLabel = app.active ? "Stop" : "Start";
      let buttonColor = buttonLabel === "Stop" ?  "red" : "green";
      return (
        <DataContainer 
          key={idx}
          name={app.name}
          status={app.status}
          startStop={buttonLabel}
          buttonClass={buttonColor}
          changeButtonStatus={() => this.changeButtonStatus(app.name)}
        />
      );
    });

    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="column column-20"><Sidebar /></div>
            <div className="development-data-container column column-80">{data}</div>
          </div>
        </div>
      </div>
    ); 
  }
}

const mapStateToProps = state => {
  return {
    packages: state.packages
  };
};

export default connect(mapStateToProps)(DevelopmentDataDisplay);