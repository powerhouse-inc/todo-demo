import type { FormEventHandler } from "react";
import { addTodoItem } from "@powerhousedao/todo-demo/document-models/todo-list";
import { useSelectedTodoListDocument } from "@powerhousedao/todo-demo/document-models/todo-list";

/** Component for adding a new todo item to the selected todo list */
export function AddTodo() {
  const [todoList, dispatch] = useSelectedTodoListDocument();

  if (!todoList) return null;

  const onSubmitAddTodo: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const addTodoInput = form.elements.namedItem("addTodo") as HTMLInputElement;
    const text = addTodoInput.value;
    if (!text) return;

    dispatch(addTodoItem({ text }));

    form.reset();
  };

  return (
    <form onSubmit={onSubmitAddTodo} className="flex mx-auto min-w-fit gap-2">
      <input
        className="py-1 px-2 grow min-w-fit placeholder:text-gray-600 rounded border border-gray-600 text-gray-800"
        type="text"
        name="addTodo"
        placeholder="What needs to be done?"
        autoFocus
      />
      <button
        type="submit"
        className="text-gray-600 rounded border border-gray-600 px-3 py-1"
      >
        Add
      </button>
    </form>
  );
}
