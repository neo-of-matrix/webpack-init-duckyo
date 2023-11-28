import { createContext } from "react";
interface ContextInterface {
  context: string;
}
const Context = createContext<ContextInterface>(null);
export { Context };
export type { ContextInterface };
