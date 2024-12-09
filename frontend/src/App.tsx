import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import dotenv from 'dotenv';

import "../src/App.css";

import Navbar from "./components/Navbar";
import Index from "./components/Index";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoDetails from "./components/TodoDetails";
import Login from "./components/Login";
import Register from "./components/Register";

dotenv.config();

const API_BASE_URL = process.env.VITE_API_BASE_URL;

interface Todo {
  todo_id: number;
  todo_title: string;
  message: string;
  priority: boolean;
  completed: boolean;
}

interface User {
  id: number;
  email: string;
}

const App: React.FC = () => {
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const [ error, setError ] = useState<string>("");
  const [ user, setUser ] = useState<User | null >(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching Todos", error);
      setError("Sorry, there was an error fetching todos.")
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      setUser(response.data)
    } catch (error) {
      console.error("Error fetching user.", error);
      setError("There was an error fetching user information. Please try again.")
    }
  }
  
  // useEffect, when passed an empty array will run only once when the page finishes loading
  useEffect(() => {
    fetchUser()
    if (user) {
      fetchTodos();
    }
  }, []);

  // Handle new Todo 
  const handleTodoAdded = (todo: {todo_id: number, todo_title: string, message: string, priority: boolean, completed: boolean}) => {
    setTodos([todo, ...todos])
  }

  const handleToggleComplete = async (id: number, completed: boolean) => {    
      try {      
        await axios.patch(`/api/todos/${id}`, { completed });
        setTodos((prevTodos) =>         
        prevTodos.map((todo) => 
          todo.todo_id === id ? { ...todo, completed } : todo
      ))
    } catch (error) {
      console.error("Error completing todo", error)
    }
  };

  const handleUpdateTodo = async (id: number, title: string, message: string, priority: boolean) => {
    try {
      const response = await axios.put(`/api/todos/${id}`, { title, message, priority });      
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todo_id === id ? { 
            ...todo,
            title: response.data.title,
            message: response.data.message,
            priority: response.data.priority
          } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };

  const handleDeleteTodo = async (id: number, active: boolean) => {
    if (confirm("WARNING! This action is permamnent and cannot be undone. Are you sure you wish to delete this todo?")) {
      try {
        const response = await axios.patch(`/api/todos/${id}`, { active });
        setTodos([...response.data])
        alert("Todo successfully deleted.")     
      } catch (error) {
        console.error("Error deleting todo", error)
        setError("Sorry, there was an error deleting the todo.")
      }
    }
  };

  const handleLogin = async (user: {id: number; email: string}) => {
    setUser(user);
    fetchTodos();
  };

  const handleLogout = async () => {
    setUser(null);
    setTodos([]);
  };

  const handleRegister = async (user: {id: number; email: string}) => {
    setUser(user)
  };

  return (
    <div className="container max-w-screen-md mx-auto lg:text-xl">
      <>{error}</>
      <Router>
        <Routes>
          <Route path="/"
            element={
              <>
                <Navbar user={user} handleLogout={handleLogout} />
                <Index />
              </>
            }
          />
          <Route path="/login"
            element={
              <>
                <Navbar user={user} handleLogout={handleLogout} />
                <Login onSubmit={handleLogin} />
              </>
            }
          />
          <Route path="/register"
            element={
              <>
                <Navbar user={user} handleLogout={handleLogout}/>
                <Register onSubmit={handleRegister} />
              </>
            }
          />
          <Route path="/todos"
            element={
              <>
                <Navbar user={user} handleLogout={handleLogout} />
                <div className="mx-auto flex flex-col items-center p-4 gap-4">
                  <TodoForm onSubmit={handleTodoAdded} />
                  <h1 className="w-fit text-3xl underline underline-offset-4">To-Do List:</h1>
                  {(todos.length > 0) ? <TodoList todos={todos} onToggleComplete={handleToggleComplete}/> :
                    <div className="text-center">
                      <span className="text-xl text-green-500">Congragulations!</span><br />
                      <span>It looks like you have completed all your tasks! Use the form to add a new todo!</span> 
                    </div>
                  }
                </div>
              </>
            } 
          />
          <Route path="/todos/:id"
            element={
              <>
                <Navbar user={user} handleLogout={handleLogout} />
                <TodoDetails 
                onToggleComplete={handleToggleComplete}
                onUpdateTodo={handleUpdateTodo}
                onDeleteTodo={handleDeleteTodo}
                />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;