import { useSelectedTodoListDocument } from "@powerhousedao/todo-demo/document-models/todo-list";
import { AddTodo } from "./AddTodo.js";
import { Todos } from "./Todos.js";

import { Stats } from "@powerhousedao/todo-demo/editors/components";

/** Displays the selected todo list */
export function TodoList() {
  // this hook returns the currently selected TodoList document
  const [selectedTodoListDocument] = useSelectedTodoListDocument();

  if (!selectedTodoListDocument) return null;

  const todos = selectedTodoListDocument.state.global.items;
  const createdAtUtcIso = selectedTodoListDocument.header.createdAtUtcIso;
  const lastModifiedAtUtcIso =
    selectedTodoListDocument.header.lastModifiedAtUtcIso;

  return (
    <div className="flex flex-col items-center px-4 py-8 gap-6">
      <Stats
        todos={todos}
        createdAtUtcIso={createdAtUtcIso}
        lastModifiedAtUtcIso={lastModifiedAtUtcIso}
      />
      <AddTodo />
      <Todos todos={todos} />
    </div>
  );
}
