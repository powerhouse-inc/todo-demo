import { AnalyticsSubgraph } from "@powerhousedao/reactor-api";
import type { DocumentNode } from "graphql";
import { schema } from "./schema.js";
import { getResolvers } from "./resolvers.js";

export class TodoAnalyticsSubgraph extends AnalyticsSubgraph {
  override name = "todo-analytics";
  override typeDefs: DocumentNode = schema;
  override resolvers = getResolvers(this);
  additionalContextFields = {};
  override async onSetup() {}
  async onDisconnect() {}
}
