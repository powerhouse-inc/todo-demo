import type {
  TodoItem,
  TodoListDocument,
} from "@powerhousedao/todo-demo/document-models/todo-list";

type Props = {
  todos: TodoItem[] | undefined;
  todoListDocuments?: TodoListDocument[] | undefined;
  createdAtUtcIso?: string;
  lastModifiedAtUtcIso?: string;
};

/** Generic component for showing statistics about todo lists and the todos they contain */
export function Stats({
  todos,
  todoListDocuments,
  createdAtUtcIso,
  lastModifiedAtUtcIso,
}: Props) {
  const totalTodos = todos?.length ?? 0;
  const totalChecked = todos?.filter((todo) => todo.checked).length ?? 0;
  const totalUnchecked = todos?.filter((todo) => !todo.checked).length ?? 0;
  const percentageChecked = Math.round(
    calculatePercentage(totalTodos, totalChecked),
  );
  const percentageUnchecked = Math.round(
    calculatePercentage(totalTodos, totalUnchecked),
  );
  const createdAt = createdAtUtcIso ? new Date(createdAtUtcIso) : null;
  const hasCreatedAt = createdAt !== null;
  const lastModified = lastModifiedAtUtcIso
    ? new Date(lastModifiedAtUtcIso)
    : null;
  const hasLastModified = lastModified !== null;
  const createdAtFormattedDate = createdAt
    ? createdAt.toLocaleDateString()
    : null;
  const lastModifiedFormattedDate = lastModified
    ? lastModified.toLocaleDateString()
    : null;
  const createdAtFormattedTime = createdAt
    ? createdAt.toLocaleTimeString()
    : null;
  const lastModifiedFormattedTime = lastModified
    ? lastModified.toLocaleTimeString()
    : null;
  const totalTodoListDocuments = todoListDocuments?.length ?? 0;
  const hasTodoLists = todoListDocuments !== undefined;

  return (
    <ul className="text-sm text-gray-800 max-w-1/2">
      {hasTodoLists && (
        <li className="flex justify-between">
          <span>Todo Lists:</span> <span>{totalTodoListDocuments}</span>
        </li>
      )}
      <li className="flex justify-between">
        <span>Todos:</span> <span>{totalTodos}</span>
      </li>
      <li className="flex justify-between">
        <span>Checked:</span>{" "}
        <span>
          {totalChecked} ({percentageChecked}%)
        </span>
      </li>
      <li className="flex justify-between">
        <span>Unchecked:</span>{" "}
        <span>
          {totalUnchecked} ({percentageUnchecked}%)
        </span>
      </li>
      {hasCreatedAt && (
        <li className="flex justify-between">
          <span>Created:</span>{" "}
          <span>
            {createdAtFormattedDate} {createdAtFormattedTime}
          </span>
        </li>
      )}
      {hasLastModified && (
        <li className="flex justify-between">
          <span>Last modified:</span>{" "}
          <span>
            {lastModifiedFormattedDate} {lastModifiedFormattedTime}
          </span>
        </li>
      )}
    </ul>
  );
}

function calculatePercentage(total: unknown, value: unknown) {
  if (typeof total !== "number" || typeof value !== "number") {
    return 0;
  }
  const ratio = value / total;
  if (isNaN(ratio)) {
    return 0;
  }
  return ratio * 100;
}
