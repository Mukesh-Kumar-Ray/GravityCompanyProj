import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import Filter from "./Filter";
import TodoList from "./TodoList";
import axios from "axios";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/todos");
        //console.log(data);
        setTodos(response.data.todos);
        localStorage.setItem("todos", JSON.stringify(response.data.todos));
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchTodos();
  }, []);
  ///these things latter
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = async (text) => {
    try {
      const response = await axios.post("https://dummyjson.com/todos/add", {
        todo: text,
        completed: false,
        userId: 1,
      });
      //  console.log(response)
      const newTodo = response.data;
      setTodos([newTodo, ...todos]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const response = await axios.put(`https://dummyjson.com/todos/${id}`, {
        completed: !completed,
      });
      //console.log(response);
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (err) {
      console.log(err.message)
    }
  };

  const deleteTodo = async (id) => {
    try{
        const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
       //console.log(response)  
       setTodos(todos.filter((todo) => todo.id !== id));
    }catch(err){
       console.log(err.message)
    }
   
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });
  //console.log(todos);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        To-Do App
      </h1>
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
