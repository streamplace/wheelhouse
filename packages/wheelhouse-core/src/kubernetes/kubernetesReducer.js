
const initialState = {};

export default function(state = initialState, action) {
  if (action.type === "KUBERNETES_DATA") {
    return Object.assign({}, state, { pods: action.output});
  }
  return state;
}
