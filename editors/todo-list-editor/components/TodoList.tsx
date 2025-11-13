import { useSelectedTodoListDocument } from "todo-tutorial/document-models/todo-list";
import { EditTodoListName } from "./EditName.js";
import { Todos } from "./Todos.js";
import { AddTodo } from "./AddTodo.js";
import { CloseButton } from "./CloseButton.js";

/** Displays the selected todo list */
export function TodoList() {
  const [selectedTodoList] = useSelectedTodoListDocument();

  if (!selectedTodoList) return null;

  const todos = selectedTodoList.state.global.items;

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
        <Todos todos={todos} />
      </section>
      <section>
        <AddTodo />
      </section>
    </div>
  );
}
