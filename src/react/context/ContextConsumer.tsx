import { useContext } from "react";
import { Context } from "./Contexts";
const ContextConsumer = () => {
  const value = useContext(Context);
  return <div>{value.context}</div>;
};
export default ContextConsumer;
