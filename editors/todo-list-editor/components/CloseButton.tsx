import { setSelectedNode } from "@powerhousedao/reactor-browser";
import type { MouseEventHandler } from "react";

/** Closes the selected todo list document editor */
export function CloseButton() {
  const onCloseButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    setSelectedNode(undefined);
  };

  return (
    <button onClick={onCloseButtonClick} className="text-sm text-gray-600">
      Close
    </button>
  );
}
