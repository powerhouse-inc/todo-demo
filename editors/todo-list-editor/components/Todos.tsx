import type { TodoItem } from "todo-tutorial/document-models/todo-list";
import { Todo } from "./Todo.js";

type Props = {
  todos: TodoItem[];
};

/** Shows a list of the todo items in the selected todo list */
export function Todos({ todos }: Props) {
  const hasTodos = todos.length > 0;

  return (
    <div className="w-[400px] rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
        Todos
      </div>
      {!hasTodos ? (
        <p className="text-sm text-gray-500">
          Start adding things to your todo list
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <li key={todo.id}>
              <Todo todo={todo} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
