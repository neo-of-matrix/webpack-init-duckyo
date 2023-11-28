import { tabType } from "./index";
import type { todoType } from "./index";
function createTodos(): todoType[] {
  const todos: todoType[] = [];
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: "Todo " + (i + 1),
      completed: Math.random() > 0.5,
    });
  }
  return todos;
}

function filterTodos<T extends todoType>(
  todos: T[],
  tab: tabType,
  functionName
): T[] {
  if (functionName === "memoFn") {
    console.log(
      "[ARTIFICIALLY SLOW] Filtering " +
        todos.length +
        ' todos for "' +
        tab +
        '" tab.'
    );
    const startTime = performance.now();
    while (performance.now() - startTime < 500) {
      // Do nothing for 500 ms to emulate extremely slow code
    }
  }

  const { all, Active, Completed } = tabType;
  return todos.filter((todo) => {
    if (tab === all) {
      return true;
    } else if (tab === Active) {
      return !todo.completed;
    } else if (tab === Completed) {
      return todo.completed;
    }
  });
}


export { createTodos, filterTodos };
