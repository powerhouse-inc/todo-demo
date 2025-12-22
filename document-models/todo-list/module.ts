import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { TodoListPHState } from "todo-tutorial/document-models/todo-list";
import {
  actions,
  documentModel,
  reducer,
  utils,
} from "todo-tutorial/document-models/todo-list";

/** Document model module for the Todo List document type */
export const TodoList: DocumentModelModule<TodoListPHState> = {
  reducer,
  actions,
  utils,
  documentModel: createState(defaultBaseState(), documentModel),
};
