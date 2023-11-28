import { useState } from "react";
import TodoList from "./TodoList";
import { createTodos } from "./utils";
import "./style.css";
export type todoType = {
  id: number;
  text: string;
  completed: boolean;
};
export enum tabType {
  "all" = "all",
  "Active" = "Active",
  "Completed" = "Completed",
}
const todos = createTodos();
export default function MemoComponent() {
  const { all, Active, Completed } = tabType;
  const [tab, setTab] = useState(all);
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setTab(all)}>All</button>
      <button onClick={() => setTab(Active)}>Active</button>
      <button onClick={() => setTab(Completed)}>Completed</button>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <TodoList todos={todos} tab={tab} theme={isDark ? "dark" : "light"} />
    </>
  );
}
