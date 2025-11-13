import { type EditorModule } from "document-model";
import { lazy } from "react";

export const TodoDriveExplorer: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/document-drive"],
  config: {
    id: "todo-drive-explorer",
    name: "TodoDriveExplorer",
  },
};
