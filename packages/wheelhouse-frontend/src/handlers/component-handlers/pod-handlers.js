
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
