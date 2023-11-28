import { useSyncExternalStore } from "react";
import { store } from "./Store.tsx";

const ReduxComponent = () => {

  // eslint-disable-next-line
  const snapshot = useSyncExternalStore(store.subscribe, store.getState);
  return (
    <div>
      <div>{snapshot.value}</div>
      <button onClick={() => store.dispatch({ type: "counter/incremented" })}>
        增加
      </button>
      <button onClick={() => store.dispatch({ type: "counter/decremented" })}>
        减少
      </button>
    </div>
  );
};
export default ReduxComponent;
