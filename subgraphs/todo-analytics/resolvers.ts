import type { AnalyticsSubgraph } from "@powerhousedao/reactor-api";
import { AnalyticsPath } from "@powerhousedao/analytics-engine-core";

interface AnalyticsRow {
  start: string;
  end: string;
  metric: string;
  value: number;
  dimensions: Array<{ name: string; path: { toString(): string } }>;
}

interface AnalyticsQueryResult {
  rows: AnalyticsRow[];
}

export const getResolvers = (subgraph: AnalyticsSubgraph) => {
  const analyticsStore = subgraph.analyticsStore;

  return {
    Query: {
      todoAnalytics: async (
        _: unknown,
        args: {
          driveId: string;
          start: string;
          end: string;
          granularity: string;
        },
      ) => {
        // Query analytics for the specified drive and time range
        // Note: getSeriesValues may be a custom method on the analytics store implementation
        const results = await (analyticsStore as unknown as {
          getSeriesValues: (query: unknown) => Promise<AnalyticsQueryResult>;
        }).getSeriesValues({
          start: args.start,
          end: args.end,
          granularity: args.granularity as "daily" | "weekly" | "monthly" | "yearly" | "total",
          metrics: ["TodosCreated", "TodosCompleted", "TodosUncompleted", "TodosDeleted"],
          dimensions: [
            {
              name: "drive",
              select: AnalyticsPath.fromString(`todo-list/drive/${args.driveId}`),
              lod: 3,
            },
          ],
        });

        return results.rows.map((row: AnalyticsRow) => ({
          start: row.start,
          end: row.end,
          metric: row.metric,
          value: row.value,
          dimensions: row.dimensions.map((dim) => ({
            name: dim.name,
            path: dim.path.toString(),
          })),
        }));
      },
    },
  };
};