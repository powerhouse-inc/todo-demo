import { generateId } from "@powerhousedao/design-system/connect/components/drop-zone/utils";
import type { FormEventHandler } from "react";
import { addTodoItem } from "@powerhousedao/todo-demo/document-models/todo-list";
import { useSelectedTodoListDocument } from "@powerhousedao/todo-demo/document-models/todo-list";

export function AddTodo() {
  // The hooks for getting documents also return a dispatch function for dispatching actions to modify the document.

  // This is the same pattern you will have seen in React's `useReducer` hook, except you don't need to pass the initial state.

  // The document we are working with _is_ the initial state.
  const [todoList, dispatch] = useSelectedTodoListDocument();

  if (!todoList) return null;

  const onSubmitAddTodo: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const addTodoInput = form.elements.namedItem("addTodo") as HTMLInputElement;
    const text = addTodoInput.value;
    if (!text) return;

    dispatch(addTodoItem({ text, id: generateId() }));

    form.reset();
  };

  return (
    <div className="w-[400px] rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
        Add Todo
      </div>
      <form onSubmit={onSubmitAddTodo} className="flex gap-2">
        <input
          className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-lg font-semibold text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          type="text"
          name="addTodo"
          placeholder="What needs to be done?"
          autoFocus
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Add
        </button>
      </form>
    </div>
  );
}
