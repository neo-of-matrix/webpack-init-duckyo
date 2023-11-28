import type { ReactNode } from "react";
import { Context } from "./Contexts";
import type { ContextInterface } from "./Contexts";
export const Provider = (props: {
  value: ContextInterface;
  children: ReactNode;
}) => {
  const { children, value } = props;
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
