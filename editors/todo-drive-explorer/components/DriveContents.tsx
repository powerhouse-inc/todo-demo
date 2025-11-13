import {
  useSelectedDrive,
  useSelectedFolder,
} from "@powerhousedao/reactor-browser";
import { CreateDocument } from "./CreateDocument.js";
import { EmptyState } from "./EmptyState.js";
import { Files } from "./Files.js";
import { Folders } from "./Folders.js";
import { NavigationBreadcrumbs } from "./NavigationBreadcrumbs.js";
import { Stats } from "@powerhousedao/todo-demo/editors/components";
import {
  useTodoListDocumentsInSelectedDrive,
  useTodoListDocumentsInSelectedFolder,
  type TodoItem,
  type TodoListDocument,
} from "@powerhousedao/todo-demo/document-models/todo-list";

/** Small helper function to get all todo items from all todo lists */
export function getAllTodoItemsFromTodoLists(
  todoLists: TodoListDocument[] | undefined,
): TodoItem[] {
  return todoLists?.flatMap((todoList) => todoList.state.global.items) ?? [];
}

/** Shows the documents and folders in the selected drive */
export function DriveContents() {
  const selectedFolder = useSelectedFolder();
  const hasSelectedFolder = selectedFolder !== undefined;
  return (
    <div className="space-y-6 px-6">
      <NavigationBreadcrumbs />
      {hasSelectedFolder ? <FolderStats /> : <DriveStats />}
      <Folders />
      <Files />
      <EmptyState />
      <CreateDocument />
    </div>
  );
}

/** Shows the statistics for the selected drive */
function DriveStats() {
  const todoListDocumentsInSelectedDrive =
    useTodoListDocumentsInSelectedDrive();
  const allTodos = getAllTodoItemsFromTodoLists(
    todoListDocumentsInSelectedDrive,
  );
  const [selectedDrive] = useSelectedDrive();
  const driveCreatedAt = selectedDrive.header.createdAtUtcIso;
  const driveLastModified = selectedDrive.header.lastModifiedAtUtcIso;

  return (
    <Stats
      todos={allTodos}
      todoListDocuments={todoListDocumentsInSelectedDrive}
      createdAtUtcIso={driveCreatedAt}
      lastModifiedAtUtcIso={driveLastModified}
    />
  );
}

/** Shows the statistics for the selected folder */
function FolderStats() {
  const todoListDocumentsInSelectedFolder =
    useTodoListDocumentsInSelectedFolder();
  const allTodos = getAllTodoItemsFromTodoLists(
    todoListDocumentsInSelectedFolder,
  );

  return (
    <Stats
      todos={allTodos}
      todoListDocuments={todoListDocumentsInSelectedFolder}
    />
  );
}
