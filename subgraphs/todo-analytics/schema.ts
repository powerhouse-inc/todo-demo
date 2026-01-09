import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Analytics data point with time and value
  """
  type TodoAnalyticsRow {
    start: String!
    end: String!
    metric: String!
    value: Float!
    dimensions: [AnalyticsDimension!]!
  }

  type AnalyticsDimension {
    name: String!
    path: String!
  }

  """
  Todo productivity analytics queries
  """
  type Query {
    """
    Get todo analytics for a specific time range and granularity
    """
    todoAnalytics(
      driveId: ID!
      start: String!
      end: String!
      granularity: String!
    ): [TodoAnalyticsRow!]!
  }
`;