import { type ISubgraph } from "@powerhousedao/reactor-api";

export const getResolvers = (subgraph: ISubgraph): Record<string, unknown> => {
  const reactor = subgraph.reactor;

  return {
    Query: {
      example: async (parent: unknown, args: { driveId: string }) => {
        return "example";
      },
    },
  };
};
