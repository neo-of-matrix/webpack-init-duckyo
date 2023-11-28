import { useMemo } from "react";
import { tabType } from "./index";
import type { todoType } from "./index";
import { filterTodos } from "./utils";
import { useParams } from "react-router-dom";
import List from "./List";
export default function TodoList({
  todos,
  theme,
  tab,
}: {
  todos: todoType[];
  theme: "dark" | "light";
  tab: tabType;
}) {
  const visibleTodos = useMemo<todoType[]>(
    () => filterTodos(todos, tab, "memoFn"),
    [todos, tab]
  );
  const params = useParams();
  const { id } = params;
  return (
    <div className={theme}>
      <p>
        <b>
          Note: <code>{`filterTodos_${id}`}</code> is artificially slowed down!
        </b>
      </p>
      {id === "memoFn" ? (
        <ul>
          {visibleTodos.map((todo) => (
            <li key={todo.id}>
              {todo.completed ? <s>{todo.text}</s> : todo.text}
            </li>
          ))}
        </ul>
      ) : (
        <List items={visibleTodos} />
      )}
    </div>
  );
}
