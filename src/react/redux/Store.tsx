import { legacy_createStore } from "redux";

type ActionType = {
  type: "counter/incremented" | "counter/decremented";
};

function counterReducer(state = { value: 0 }, action: ActionType) {
  switch (action.type) {
    case "counter/incremented":
      return { value: state.value + 1 };
    case "counter/decremented":
      return { value: state.value - 1 };
    default:
      return state;
  }
}
const store = legacy_createStore(counterReducer, { value: 0 });

export { store };