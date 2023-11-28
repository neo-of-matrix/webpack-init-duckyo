import Provider from "./Providers";
import ContextConsumer from "./ContextConsumer";

export default function () {
  return (
    <Provider value={{ context: "context" }}>
      <ContextConsumer />
      <ContextConsumer />
      <ContextConsumer />
    </Provider>
  );
}
