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
  type UpdateTodoItemInput,
  type TodoItem,
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

  it("should handle updateTodoItem operation to update text", () => {
    // we need there to already be a todo item in the document,
    // since we want to test updating an existing document
    const mockItem = generateMock(UpdateTodoItemInputSchema());

    // we also need to generate a mock input for the update operation we are testing
    const input: UpdateTodoItemInput = generateMock(
      UpdateTodoItemInputSchema(),
    );

    // since the mocks are generated with random values, we need to set the `id` on our mock input
    // to match the `id` of the existing mock input
    input.id = mockItem.id;

    // we want to easily check if the item's text was updated to be our new value,
    // so we assign a variable and use that for the mock input's text field
    const newText = "new text";
    input.text = newText;

    // we are only testing updating the text here, so we want the checked field on the input
    // to be undefined, i.e. it should not change anything on the existing item
    input.checked = undefined;

    // we can pass a different initial state to the `createDocument` utility,
    // so in this case we pass in an `items` array with our existing item already in it
    const document = utils.createDocument({
      global: {
        items: [mockItem as TodoItem],
      },
    });

    /* The following checks are copied from the boilerplate */

    // create an updated document by applying the reducer with the action and input
    const updatedDocument = reducer(document, updateTodoItem(input));

    // there should now be one operation in the operations list
    expect(updatedDocument.operations.global).toHaveLength(1);

    // the operation applied should correspond to an action of the correct type
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TODO_ITEM",
    );

    // the operation applied should have used the correct input
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );

    // the operation applied should be the first operation in the list
    expect(updatedDocument.operations.global[0].index).toEqual(0);

    /* The following checks are unique to this test case */

    // find the updated item in the items list by its `id`
    const updatedItem = updatedDocument.state.global.items.find(
      (item) => item.id === input.id,
    );

    // the item's text should now be updated to be our new text
    expect(updatedItem?.text).toBe(newText);

    // the item's `checked` field should be unchanged.
    expect(updatedItem?.checked).toBe(mockItem.checked);
  });

  it("should handle updateTodoItem operation to update checked", () => {
    // generate a mock existing item
    const mockItem = generateMock(UpdateTodoItemInputSchema());

    // generate a mock input
    const input: UpdateTodoItemInput = generateMock(
      UpdateTodoItemInputSchema(),
    );

    // set the mock input's `id` to the mock item's `id`
    input.id = mockItem.id;

    // we want the new `checked` field value to be the opposite of the randomly generated value from the mock
    const newChecked = !mockItem.checked;
    input.checked = newChecked;

    // leave the `text` field unchanged
    input.text = undefined;

    // create a document with the existing item in it
    const document = utils.createDocument({
      global: {
        items: [mockItem as TodoItem],
      },
    });

    // apply the reducer with the action and the mock input
    const updatedDocument = reducer(document, updateTodoItem(input));

    /* The following checks are copied from the boilerplate */

    // check your operations
    expect(updatedDocument.operations.global).toHaveLength(1);

    // check the operation's action type
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TODO_ITEM",
    );

    // check the operation's input
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );

    // check the operation's index
    expect(updatedDocument.operations.global[0].index).toEqual(0);

    /* The following checks are unique to this test case */

    // get the updated item by it's `id`
    const updatedItem = updatedDocument.state.global.items.find(
      (item) => item.id === input.id,
    );

    // the item's `text` field should remain unchanged
    expect(updatedItem?.text).toBe(mockItem.text);

    // the item's `checked` field should be updated to our new checked value
    expect(updatedItem?.checked).toBe(newChecked);
  });

  it("should handle deleteTodoItem operation", () => {
    // generate a mock existing item
    const mockItem = generateMock(UpdateTodoItemInputSchema());

    const document = utils.createDocument({
      global: {
        items: [mockItem as TodoItem],
      },
    });

    const input = generateMock(DeleteTodoItemInputSchema());
    input.id = mockItem.id;

    const updatedDocument = reducer(document, deleteTodoItem(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_TODO_ITEM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);

    const updatedItems = updatedDocument.state.global.items;
    expect(updatedItems).toHaveLength(0);
  });
});
