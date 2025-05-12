import React from "react";

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => (
  <li
    className={`flex items-center justify-between p-4 bg-green rounded-lg shadow-md hover:shadow-lg transition ${
      todo.completed ? "bg-green-600 text-white" : "bg-yellow-500 text-white"
    }`}
  >
    <div className={`cursor-pointer flex-1 overflow-hidden`}>{todo.todo}</div>
    {todo.completed == true ? (
      <button className="ml-4 px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition"
        onClick={() => toggleTodo(todo.id, todo.completed)}>Pending</button>
    ) : (
      <button
        className="ml-4 px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition"
        onClick={() => toggleTodo(todo.id, todo.completed)}
      >
        completed
      </button>
    )}

    <button
      onClick={() => deleteTodo(todo.id)}
      className="ml-4 px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition"
    >
      Delete
    </button>
  </li>
);

export default TodoItem;