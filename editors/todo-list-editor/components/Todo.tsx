import {
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
  type MouseEventHandler,
} from "react";
import {
  deleteTodoItem,
  updateTodoItem,
} from "@powerhousedao/todo-demo/document-models/todo-list";
import type { TodoItem } from "@powerhousedao/todo-demo/document-models/todo-list";
import { useSelectedTodoListDocument } from "@powerhousedao/todo-demo/document-models/todo-list";

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
        className="flex gap-2 items-center justify-between"
        onSubmit={onSubmitUpdateTodoText}
      >
        <input
          className="p-1 grow"
          type="text"
          name="todoText"
          defaultValue={todoText}
          autoFocus
        />
        <div className="flex gap-2 grow-0">
          <button type="submit" className="text-sm text-gray-600">
            Save
          </button>
          <button
            className="text-sm text-red-800"
            onClick={onClickCancelEditTodo}
          >
            Cancel
          </button>
        </div>
      </form>
    );

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 p-1">
        <input
          type="checkbox"
          checked={todoChecked}
          onChange={onChangeTodoChecked}
        />
        <span className={todoChecked ? "line-through" : ""}>{todoText}</span>
      </div>
      <span className="flex place-items-center gap-2 text-sm">
        <button className="text-gray-600" onClick={onClickEditTodo}>
          Edit
        </button>
        <button className="text-red-800" onClick={onClickDeleteTodo}>
          Delete
        </button>
      </span>
    </div>
  );
}
