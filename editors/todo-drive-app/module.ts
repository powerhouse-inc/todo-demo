import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the "powerhouse/document-drive" document type */
export const TodoDriveApp: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/document-drive"],
  config: {
    id: "todo-drive-app",
    name: "TodoDriveApp",
  },
};
