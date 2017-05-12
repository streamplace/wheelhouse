import React from "react";
// import success from "../../../public/assets/success.png";
// import error from "../../../public/assets/error.png";

export const activeApps = apps => {
  return apps.map((app, idx) => {
    if (app.active) {
      return (
        <li key={idx}>
          {app.name}: <span className="active">STARTED</span>
        </li>
      );
    } else {
      return (
        <li key={idx}>
          {app.name}: <span className="inactive">STOPPED</span>
        </li>
      );
    }
  });
};
