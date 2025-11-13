import { setName } from "document-model";
import type { FormEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import { useSelectedTodoListDocument } from "todo-tutorial/document-models/todo-list";

/** Displays the name of the selected TodoList document and allows editing it */
export function EditTodoListName() {
  const [todoListDocument, dispatch] = useSelectedTodoListDocument();
  const [isEditing, setIsEditing] = useState(false);

  if (!todoListDocument) return null;

  const todoListDocumentName = todoListDocument.header.name;

  const onClickEditTodoListName: MouseEventHandler<HTMLButtonElement> = () => {
    setIsEditing(true);
  };

  const onClickCancelEditTodoListName: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsEditing(false);
  };

  const onSubmitSetName: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const name = nameInput.value;
    if (!name) return;

    dispatch(setName(name));
    setIsEditing(false);
  };

  if (isEditing)
    return (
      <form
        className="flex gap-2 items-center justify-between"
        onSubmit={onSubmitSetName}
      >
        <input
          className="text-lg font-semibold text-gray-900 p-1"
          type="text"
          name="name"
          defaultValue={todoListDocumentName}
          autoFocus
        />
        <div className="flex gap-2">
          <button type="submit" className="text-sm text-gray-600">
            Save
          </button>
          <button
            className="text-sm text-red-800"
            onClick={onClickCancelEditTodoListName}
          >
            Cancel
          </button>
        </div>
      </form>
    );

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-900">
        {todoListDocumentName}
      </h2>
      <button
        className="text-sm text-gray-600"
        onClick={onClickEditTodoListName}
      >
        Edit Name
      </button>
    </div>
  );
}
