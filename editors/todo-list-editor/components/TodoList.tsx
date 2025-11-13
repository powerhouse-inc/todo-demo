import { useSelectedTodoListDocument } from "@powerhousedao/todo-demo/document-models/todo-list";
import { Stats } from "@powerhousedao/todo-demo/editors/components";
import { EditTodoListName } from "./EditName.js";
import { Todos } from "./Todos.js";
import { AddTodo } from "./AddTodo.js";
import { CloseButton } from "./CloseButton.js";

/** Displays the selected todo list */
export function TodoList() {
  const [selectedTodoList] = useSelectedTodoListDocument();

  if (!selectedTodoList) return null;

  const todos = selectedTodoList.state.global.items;
  const createdAtUtcIso = selectedTodoList.header.createdAtUtcIso;
  const lastModifiedAtUtcIso = selectedTodoList.header.lastModifiedAtUtcIso;

  return (
    <div>
      <section className="mb-4 flex gap-2 items-center">
        <div className="grow">
          <EditTodoListName />
        </div>
        <div className="flex-none">
          <CloseButton />
        </div>
      </section>
      <section className="mb-4">
        <Stats
          todos={todos}
          createdAtUtcIso={createdAtUtcIso}
          lastModifiedAtUtcIso={lastModifiedAtUtcIso}
        />
      </section>
      <section className="mb-4">
        <Todos todos={todos} />
      </section>
      <section>
        <AddTodo />
      </section>
    </div>
  );
}
