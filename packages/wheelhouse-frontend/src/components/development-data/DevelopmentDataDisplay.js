import React, { Component } from "react";
// import { connect } from "react-redux";
import DataContainer from "../reusables/DataContainer"; 
import Header from "../reusables/Header";
import Sidebar from "../reusables/Sidebar";
import "../../DevelopmentData.css"; 

class DevelopmentDataDisplay extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="column column-20"><Sidebar /></div>
            <div className="development-data-container column column-80">
              <DataContainer />
            </div>
          </div>
        </div>
      </div>
    ); 
  }
}

export default DevelopmentDataDisplay; 