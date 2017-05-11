import React from "react";

export const createList = listLocation => {
  return listLocation.map((item, idx) => {
    return <li key={idx}> {item.name}: {item.value}</li>;
  });
};
