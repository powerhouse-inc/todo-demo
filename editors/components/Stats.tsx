import type {
  TodoItem,
  TodoListDocument,
} from "todo-tutorial/document-models/todo-list";

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
    <div className="w-[400px] rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
        Statistics
      </div>
      <ul className="flex flex-col gap-2">
        {hasTodoLists && (
          <li className="flex justify-between items-center rounded-lg border border-gray-200 p-3">
            <span className="text-sm text-gray-600">Todo Lists</span>
            <span className="text-sm font-medium text-gray-900">{totalTodoListDocuments}</span>
          </li>
        )}
        <li className="flex justify-between items-center rounded-lg border border-gray-200 p-3">
          <span className="text-sm text-gray-600">Todos</span>
          <span className="text-sm font-medium text-gray-900">{totalTodos}</span>
        </li>
        <li className="flex justify-between items-center rounded-lg border border-gray-200 p-3">
          <span className="text-sm text-gray-600">Checked</span>
          <span className="text-sm font-medium text-gray-900">
            {totalChecked} ({percentageChecked}%)
          </span>
        </li>
        <li className="flex justify-between items-center rounded-lg border border-gray-200 p-3">
          <span className="text-sm text-gray-600">Unchecked</span>
          <span className="text-sm font-medium text-gray-900">
            {totalUnchecked} ({percentageUnchecked}%)
          </span>
        </li>
        {hasCreatedAt && (
          <li className="flex justify-between items-center rounded-lg border border-gray-200 p-3">
            <span className="text-sm text-gray-600">Created</span>
            <span className="text-sm font-medium text-gray-900">
              {createdAtFormattedDate} {createdAtFormattedTime}
            </span>
          </li>
        )}
        {hasLastModified && (
          <li className="flex justify-between items-center rounded-lg border border-gray-200 p-3">
            <span className="text-sm text-gray-600">Last modified</span>
            <span className="text-sm font-medium text-gray-900">
              {lastModifiedFormattedDate} {lastModifiedFormattedTime}
            </span>
          </li>
        )}
      </ul>
    </div>
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
