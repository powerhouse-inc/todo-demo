import { useSetPHDriveEditorConfig } from "@powerhousedao/reactor-browser";
import type { EditorProps } from "document-model";
import { DriveExplorer } from "./components/DriveExplorer.js";
import { editorConfig } from "./config.js";

/** Implement your drive explorer behavior here */
export default function Editor(props: EditorProps) {
  useSetPHDriveEditorConfig(editorConfig);
  return <DriveExplorer {...props} />;
}
