import type { TodoListTodosOperations } from "@powerhousedao/todo-demo/document-models/todo-list";

export const todoListTodosOperations: TodoListTodosOperations = {
  addTodoItemOperation(state, action) {
    state.items.push({
      id: action.input.id,
      text: action.input.text,
      checked: false,
    });
  },
  updateTodoItemOperation(state, action) {
    const item = state.items.find((item) => item.id === action.input.id);
    if (!item) return state;
    item.text = action.input.text ?? item.text;
    item.checked = action.input.checked ?? item.checked;
  },
  deleteTodoItemOperation(state, action) {
    state.items = state.items.filter((item) => item.id !== action.input.id);
  },
};
