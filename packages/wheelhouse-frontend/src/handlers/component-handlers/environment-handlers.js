import React from "react";

export const createLabels = env => {
  let results = [];
  let keys = Object.keys(env);

  keys.forEach((key, idx) => {
    results.push(
      <p key={idx} className="top-env-header">
        <span key={key} className="bold">{key}</span>
        <span>: {env[key].currentValue}</span>
      </p>
    );
  });

  return results;
};
