import React from "react"; 


// const tree = {
//   packages: [
//     {
//       name: "maestro",
//       status: "RUNNING",
//       active: true,
//     },
//     {
//       name: "mendoza",
//       status: "STOPPED",
//       active: false,
//     },
//     {
//       name: "mendoza",
//       status: "ERRORED",
//       active: true,
//     },
//   ]
// }

const DataContainer = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="column">Maestro</div>
        <div className="column">RUNNING</div>
        <div className="column"><button>Stop</button></div>
      </div>
    </div>
  ); 
};

export default DataContainer; 