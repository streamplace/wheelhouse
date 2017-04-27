
export const CHANGE_BUTTON_STATUS = "CHANGE_BUTTON_STATUS";
export const changeButtonStatus = (name) => ({
  type: CHANGE_BUTTON_STATUS, 
  name
});

export const ADD_LOG = "ADD_LOG"; 
export const addLog = () => ({
  type: ADD_LOG, 
});
