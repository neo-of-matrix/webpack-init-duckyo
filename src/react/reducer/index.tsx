import { useReducer } from "react";
import type { Reducer } from "react";

type ActionType = {
  type: "increment" | "decrement" | "payload";
  payload?: number;
};

const ReducerComponent = () => {
  const reducer: Reducer<number, ActionType> = (state, action) => {
    const { payload, type } = action;
    switch (type) {
      case "increment":
        return state + 1;
      case "decrement":
        return state - 1;
      case "payload":
        return payload;
      default:
        return state;
    }
  };
  const [stateReducer, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <div>{stateReducer}</div>
      <button onClick={() => dispatch({ type: "increment" })}>增加</button>
      <button onClick={() => dispatch({ type: "decrement" })}>减少</button>
    </div>
  );
};
export default ReducerComponent;
