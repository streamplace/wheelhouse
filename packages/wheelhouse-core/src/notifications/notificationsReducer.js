// import { NOTIFICATION_TEXT_LOG } from "./notificationConstants";
// import { NOTIFICATION_TEXT_SEND } from "./notificationConstants";

// const initialState = {
//   smsLogs: []
// };

// export default function(state = initialState, action) {
//   if (action.type === NOTIFICATION_TEXT_SEND) {

//   }
//   if (action.type === NOTIFICATION_TEXT_LOG) {
//     const newMessage = {
//       appName: action.notificationLog,
//       to: action.to,
//       from: action.from,
//       message: action.message,
//       data: Date.now()
//     };
//     return Object.assign({}, state, {
//       smsLogs: [...state.smsLogs, newMessage]
//     });
//   }
//   return state;
// }
