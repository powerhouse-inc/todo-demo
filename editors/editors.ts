import type { EditorModule } from "document-model";
import { TodoListEditor } from "./todo-list-editor/module.js";
import { TodoDriveExplorer } from "./todo-drive-explorer/module.js";

export const editors: EditorModule[] = [TodoListEditor, TodoDriveExplorer];
