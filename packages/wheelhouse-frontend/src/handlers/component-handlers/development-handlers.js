import React from "react";

export const activeApps = apps => {
  return apps.map((app, idx) => {
    if (app.active) {
      return (
        <li key={idx}>
          {app.name}
          :
          {" "}
          <span className="active">
            <i className="fa app-started fa-check" aria-hidden="true" />
          </span>
        </li>
      );
    } else {
      return (
        <li key={idx}>
          {app.name}
          :
          {" "}
          <span className="inactive">
            <i className="fa app-not-started fa-times" aria-hidden="true" />
          </span>
        </li>
      );
    }
  });
};
