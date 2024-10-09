import { useEffect, useState } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoDetails from "./components/TodoDetails";

import "../src/App.css";

interface Todo {
  id: number;
  title: string;
  message: string;
  priority: boolean;
  completed: boolean;
}

const App: React.FC = () => {
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const [ error, setError ] = useState<string>("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching Todos', error);
      setError("Sorry, there was an error fetching todos.")
    }
  };

  // useEffect, when passed an empty array will run only once when the page finishes loading
  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle new Todo 
  const handleTodoAdded = (todo: {id: number, title: string, message: string, priority: boolean, completed: boolean}) => {
    setTodos([todo, ...todos])
    
  }

  const handleToggleComplete = async (id:number, completed: boolean) => {    
        
    try {      
      await axios.patch(`/api/todos/${id}`, { completed });

      setTodos((prevTodos) =>         
        prevTodos.map((todo) => 
          todo.id === id ? { ...todo, completed } : todo
        )
      )
    } catch (error) {
      console.error('Error completing todo', error)
    }
  };

  const handleUpdateTodo = async (id: number, title: string, message: string) => {
    try {
      const response = await axios.put(`/api/todos/${id}`, { title, message });      
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, title: response.data.title, message: response.data.message} : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo', error);
    }
  };

  return (
    <div className="container mt-8 max-w-screen-md mx-auto lg:text-xl">
      <>{error}</>
      <Router>
        <Routes>
          <Route path="/"
            element={
              <>
                <div>
                  <h1>Welcome</h1>
                  <Link to={"/todos"}>Todos</Link>
                </div>
              </>
            }
          />
          <Route path="/todos"
            element={
              <div className="mx-auto flex flex-col items-center">
                <h1 className="w-fit text-3xl underline underline-offset-4">To-Do List</h1>
                <TodoForm onSubmit={handleTodoAdded} />
                {!(todos.length === 0) && <TodoList todos={todos} onToggleComplete={handleToggleComplete}/> }
              </div>
            } 
          />
          <Route
            path="/todos/:id"
            element={
              <TodoDetails 
              onToggleComplete={handleToggleComplete}
              onUpdateTodo={handleUpdateTodo}
              />
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;