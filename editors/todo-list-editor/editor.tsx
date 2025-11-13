import { TodoList } from "./components/TodoList.js";

/** Editor component for the Todo List document type */
export default function Editor() {
  return (
    <div className="py-4 px-8">
      <TodoList />
    </div>
  );
}
