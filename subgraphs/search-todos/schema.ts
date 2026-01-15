import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition
  """
  type Query {
    searchTodos(driveId: String!, searchTerm: String!): [String!]
  }
`;
