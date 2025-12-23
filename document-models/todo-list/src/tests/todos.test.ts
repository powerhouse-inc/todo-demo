import { generateMock } from "@powerhousedao/codegen";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isTodoListDocument,
  addTodoItem,
  updateTodoItem,
  deleteTodoItem,
  AddTodoItemInputSchema,
  UpdateTodoItemInputSchema,
  DeleteTodoItemInputSchema,
} from "todo-tutorial/document-models/todo-list";

describe("TodosOperations", () => {
  it("should handle addTodoItem operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddTodoItemInputSchema());

    const updatedDocument = reducer(document, addTodoItem(input));

    expect(isTodoListDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_TODO_ITEM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateTodoItem operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateTodoItemInputSchema());

    const updatedDocument = reducer(document, updateTodoItem(input));

    expect(isTodoListDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TODO_ITEM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteTodoItem operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteTodoItemInputSchema());

    const updatedDocument = reducer(document, deleteTodoItem(input));

    expect(isTodoListDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_TODO_ITEM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
