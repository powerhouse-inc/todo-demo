import { useSelectedTodoListDocument } from "todo-tutorial/document-models/todo-list";
import { AddTodo } from "./AddTodo.js";
import { Todos } from "./Todos.js";

/** Displays the selected todo list */
export function TodoList() {
  // this hook returns the currently selected TodoList document
  const [selectedTodoListDocument] = useSelectedTodoListDocument();

  if (!selectedTodoListDocument) return null;

  const todos = selectedTodoListDocument.state.global.items;

  return (
    <div className="flex flex-col items-center px-4 py-8 gap-6">
      <AddTodo />
      <Todos todos={todos} />
    </div>
  );
}
