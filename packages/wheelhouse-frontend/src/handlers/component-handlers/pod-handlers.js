import React from "react";

export const countReadyContainers = containers => {
  let readyCount = 0; 
  let containerLength = containers.length; 
  containers.forEach(container => {
    container.ready ? readyCount++ : null;
  });
  
  return `${readyCount}/${containerLength}`;
};

export const getContainerAge = container => {
  
  let now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth()+1;
  const date = now.getDate();
  now = `${year},${month},${date}`; 
  
  let containerCreationDate = container.metadata.creationTimestamp;
  const endingIndex = containerCreationDate.indexOf("T"); 
  containerCreationDate = containerCreationDate.slice(0, endingIndex).split("-").join(",");

  const oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(containerCreationDate);
  const secondDate = new Date(now);
  return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay))) + " days";

};

export const populateTableHeaders = (array) => {
  return array.map((header, idx) => {
    return (
      <th key={idx}>{header}</th>
    );
  });
};

export const populateTableDescriptions = (array) => {
  let results = []; 
  for (let i = 0; i<array.length; i++) {
    results.push(<tr key={i}></tr>);
    for (let j = 0; j<array[i].length; j++) {
      let description = array[i][j];
      results.push(<td>{description}</td>);
    }
  }
  return results;
};

