import type { IAnalyticsStore, AnalyticsSeriesInput } from "@powerhousedao/analytics-engine-core";
import { AnalyticsPath } from "@powerhousedao/analytics-engine-core";
import type { InternalTransmitterUpdate, IProcessor } from "document-drive";
import { DateTime } from "luxon";
import type {
  AddTodoItemInput,
  UpdateTodoItemInput,
  DeleteTodoItemInput,
} from "../../document-models/todo-list/index.js";

export class TodoAnalyticsProcessor implements IProcessor {
  constructor(private readonly analyticsStore: IAnalyticsStore) {}

  async onStrands(strands: InternalTransmitterUpdate[]): Promise<void> {
    // Early return if nothing to process
    if (strands.length === 0) {
      return;
    }

    const analyticsInputs: AnalyticsSeriesInput[] = [];

    for (const strand of strands) {
      const { driveId, documentId, operations } = strand;
      
      if (operations.length === 0) {
        continue;
      }

      // Create a unique source path for tracking data origin
      const source = AnalyticsPath.fromString(
        `todo-list/${driveId}/${documentId}`,
      );

      // Clear previous analytics on first operation to avoid duplicates
      const firstOp = operations[0];
      if (firstOp.index === 0) {
        await this.analyticsStore.clearSeriesBySource(source);
      }

      // Process each operation
      for (const operation of operations) {
        const { action } = operation;
        // Use the operation's timestamp - handle various formats
        let timestamp = DateTime.now();
        if (operation.timestampUtcMs) {
          const millis = Number(operation.timestampUtcMs);
          if (!isNaN(millis)) {
            const parsed = DateTime.fromMillis(millis);
            if (parsed.isValid) {
              timestamp = parsed;
            }
          } else {
            // Try parsing as ISO string in case it's not milliseconds
            const parsed = DateTime.fromISO(operation.timestampUtcMs);
            if (parsed.isValid) {
              timestamp = parsed;
            }
          }
        }
        
        // Base dimensions for all metrics
        const baseDimensions = {
          document: AnalyticsPath.fromString(`todo-list/document/${documentId}`),
          drive: AnalyticsPath.fromString(`todo-list/drive/${driveId}`),
        };

        switch (action.type) {
          case "ADD_TODO_ITEM": {
            const input = action.input as AddTodoItemInput;
            
            analyticsInputs.push({
              source,
              start: timestamp,
              value: 1,
              metric: "TodosCreated",
              dimensions: {
                ...baseDimensions,
                operation: AnalyticsPath.fromString("todo-list/operation/add"),
              },
            });
            break;
          }

          case "UPDATE_TODO_ITEM": {
            const input = action.input as UpdateTodoItemInput;
            
            // Track completion status changes
            if (input.checked === true) {
              analyticsInputs.push({
                source,
                start: timestamp,
                value: 1,
                metric: "TodosCompleted",
                dimensions: {
                  ...baseDimensions,
                  operation: AnalyticsPath.fromString("todo-list/operation/complete"),
                },
              });
            } else if (input.checked === false) {
              analyticsInputs.push({
                source,
                start: timestamp,
                value: 1,
                metric: "TodosUncompleted",
                dimensions: {
                  ...baseDimensions,
                  operation: AnalyticsPath.fromString("todo-list/operation/uncomplete"),
                },
              });
            }
            break;
          }

          case "DELETE_TODO_ITEM": {
            const input = action.input as DeleteTodoItemInput;
            
            analyticsInputs.push({
              source,
              start: timestamp,
              value: 1,
              metric: "TodosDeleted",
              dimensions: {
                ...baseDimensions,
                operation: AnalyticsPath.fromString("todo-list/operation/delete"),
              },
            });
            break;
          }
        }
      }
    }

    // Batch insert all analytics for optimal performance
    if (analyticsInputs.length > 0) {
      await this.analyticsStore.addSeriesValues(analyticsInputs);
    }
  }

  async onDisconnect(): Promise<void> {
    // Cleanup logic if needed
  }
}