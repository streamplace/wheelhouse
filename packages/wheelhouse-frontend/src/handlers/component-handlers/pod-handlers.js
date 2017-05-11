import React from "react";

export const countReadyContainers = containers => {
  let readyCount = 0;
  let containerLength = containers.length;
  containers.forEach(container => {
    if (container.ready) {
      readyCount++;
    }
  });

  return `${readyCount}/${containerLength}`;
};

export const notReadyContainers = containers => {
  return containers
    .filter(container => {
      return !container.ready;
    })
    .map((container, idx) => {
      return (
        <div>
          <p>These pods aren't ready: </p>
          <ul>
            <li key={idx}>{container.name}</li>
          </ul>
        </div>
      );
    });
};

export const getContainerAge = container => {
  let now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  now = `${year},${month},${date}`;

  let containerCreationDate = container.metadata.creationTimestamp;
  const endingIndex = containerCreationDate.indexOf("T");
  containerCreationDate = containerCreationDate
    .slice(0, endingIndex)
    .split("-")
    .join(",");

  const oneDay = 24 * 60 * 60 * 1000;

  const firstDate = new Date(containerCreationDate);
  const secondDate = new Date(now);
  return (
    Math.round(
      Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
    ) + "d"
  );
};

export const populateTableDescriptions = array => {
  return array.map((row, i) => {
    return (
      <tr key={i}>
        {row.map((col, j) => {
          /*eslint-disable semi*/
          //linter requires a semi colon here, but it was removed because
          //it renders in the table and throws errors
          return <td key={j} className="table-description">{col}</td>;
        })}
      </tr>
    );
  });
};

export const populateTableHeaders = array => {
  return array.map((header, idx) => {
    return <th key={idx}>{header}</th>;
  });
};
