import { type ProcessorRecord } from "document-drive";
import { type IProcessorHostModule } from "document-drive";
import { type PHDocumentHeader } from "document-model";
import { TodoAnalyticsProcessor } from "./index.js";

export const TodoAnalyticsProcessorFactory =
  (module: IProcessorHostModule) =>
  (driveHeader: PHDocumentHeader): ProcessorRecord[] => {
    return [
      {
        processor: new TodoAnalyticsProcessor(module.analyticsStore),
        filter: {
          branch: ["main"],
          documentId: ["*"],
          scope: ["*"],
          documentType: ["powerhouse/todo-list"],
        },
      },
    ];
  };
