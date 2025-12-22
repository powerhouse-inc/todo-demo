import type { EditorModule } from "document-model";
import { TodoDriveApp } from "./todo-drive-app/module.js";
import { TodoListEditor } from "./todo-list-editor/module.js";

export const editors: EditorModule[] = [TodoDriveApp, TodoListEditor];
