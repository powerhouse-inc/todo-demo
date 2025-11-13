import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the Todo List document type */
export const TodoListEditor: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/todo-list"],
  config: {
    id: "todo-list-editor",
    name: "TodoListEditor",
  },
};
