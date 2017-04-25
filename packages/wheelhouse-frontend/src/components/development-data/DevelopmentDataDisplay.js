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

  changeButtonStatus() {
    this.props.dispatch(actions.changeButtonStatus("Maestro"));
  }

  render() {
    const { packages } = this.props;
    let buttonLabel = packages[0].active ? "Stop" : "Start"; 
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="column column-20"><Sidebar /></div>
            <div className="development-data-container column column-80">
              <DataContainer
                name={packages[0].name}
                status={packages[0].status}
                startStop={buttonLabel}
                changeButtonStatus={this.changeButtonStatus.bind(this)}
               />
            </div>
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