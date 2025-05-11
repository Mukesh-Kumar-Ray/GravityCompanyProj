import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import Filter from './Filter';
import TodoList from './TodoList';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('https://dummyjson.com/todos');
      const data = await res.json();
      setTodos(data.todos);
      localStorage.setItem('todos', JSON.stringify(data.todos));
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = async (text) => {
    const res = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: text, completed: false, userId: 1 }),
    });
    const newTodo = await res.json();
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = async (id, completed) => {
    const res = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    const updated = await res.json();
    setTodos(todos.map(todo => todo.id === id ? updated : todo));
  };

  const deleteTodo = async (id) => {
    await fetch(`https://dummyjson.com/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });
  console.log(todos);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
    <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">To-Do App</h1>
           <AddTodo addTodo={addTodo} />
           <Filter filter={filter} setFilter={setFilter} />
           <TodoList
                todos={filteredTodos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
           />
    </div>
  );
};

export default TodoApp;
