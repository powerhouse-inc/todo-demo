import {
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
  type MouseEventHandler,
} from "react";
import {
  deleteTodoItem,
  updateTodoItem,
} from "todo-tutorial/document-models/todo-list";
import type { TodoItem } from "todo-tutorial/document-models/todo-list";
import { useSelectedTodoListDocument } from "todo-tutorial/document-models/todo-list";

type Props = {
  todo: TodoItem;
};
/** Displays a single todo item in the selected todo list
 *
 * Allows checking/unchecking the todo item.
 * Allows editing the todo item text.
 * Allows deleting the todo item.
 */
export function Todo({ todo }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  // even though this component is for a todo item and not a whole list, we can use the exact same hook for dispatching updates to it.
  const [todoList, dispatch] = useSelectedTodoListDocument();

  if (!todoList) return null;

  const todoId = todo.id;
  const todoText = todo.text;
  const todoChecked = todo.checked;

  const onSubmitUpdateTodoText: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const textInput = form.elements.namedItem("todoText") as HTMLInputElement;
    const text = textInput.value;
    if (!text) return;
    // we can use this dispatch function for any of the actions supported by a TodoList document
    dispatch(updateTodoItem({ id: todo.id, text }));
    setIsEditing(false);
  };

  const onChangeTodoChecked: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(
      updateTodoItem({
        id: todo.id,
        checked: event.target.checked,
      }),
    );
  };

  const onClickDeleteTodo: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(deleteTodoItem({ id: todoId }));
  };

  const onClickEditTodo: MouseEventHandler<HTMLButtonElement> = () => {
    setIsEditing(true);
  };

  const onClickCancelEditTodo: MouseEventHandler<HTMLButtonElement> = () => {
    setIsEditing(false);
  };

  if (isEditing)
    return (
      <form
        className="flex gap-2 items-center rounded-lg border border-gray-200 p-3"
        onSubmit={onSubmitUpdateTodoText}
      >
        <input
          className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          type="text"
          name="todoText"
          defaultValue={todoText}
          autoFocus
        />
        <div className="flex gap-2 shrink-0">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            onClick={onClickCancelEditTodo}
          >
            Cancel
          </button>
        </div>
      </form>
    );

  return (
    <div className="flex justify-between items-center rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <input
          type="checkbox"
          checked={todoChecked}
          onChange={onChangeTodoChecked}
          className="h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span
          className={`text-sm truncate ${todoChecked ? "line-through text-gray-400" : "text-gray-900"}`}
        >
          {todoText}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
          onClick={onClickEditTodo}
        >
          Edit
        </button>
        <button
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          onClick={onClickDeleteTodo}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
