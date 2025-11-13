import type { TodoItem } from "todo-tutorial/document-models/todo-list";
import { Todo } from "./Todo.js";

type Props = {
  todos: TodoItem[];
};

/** Shows a list of the todo items in the selected todo list */
export function Todos({ todos }: Props) {
  const hasTodos = todos.length > 0;

  if (!hasTodos) {
    return <p>Start adding things to your todo list</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Todo todo={todo} />
        </li>
      ))}
    </ul>
  );
}
