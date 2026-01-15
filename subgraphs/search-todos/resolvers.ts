import { type ISubgraph } from "@powerhousedao/reactor-api";
import { type TodoListDocument } from "todo-tutorial/document-models/todo-list";

export const getResolvers = (subgraph: ISubgraph) => {
  const reactor = subgraph.reactor;

  return {
    Query: {
      searchTodos: async (
        parent: unknown,
        args: { driveId: string; searchTerm: string }
      ) => {
        const documents = await reactor.getDocuments(args.driveId);
        const todoItems: string[] = [];
        for (const docId of documents) {
          const doc: TodoListDocument = await reactor.getDocument(docId);
          if (doc.header.documentType !== "powerhouse/todo-list") {
            continue;
          }

          const amountEntries = doc.state.global.items.filter((e) =>
            e.text.includes(args.searchTerm)
          ).length;
          if (amountEntries > 0) {
            todoItems.push(docId);
          }
        }
        return todoItems;
      },
    },
  };
};
