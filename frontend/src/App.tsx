import { useEffect, useState } from "react";
import axios from 'axios';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const App = () => {
  const [ todos, setTodos ] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching Todos', error);
      
    }
  };

  // useEffect, when passed an empty array will run only once when the page finishes loading
  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle new Todo 
  const handleTodoAdded = (newTodo: Todo) => {
    setTodos([...todos, newTodo])
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
      console.error('Error updating todo', error)
    }
  }

  return (
      <div className="mx-auto flex flex-col items-center">
        <h1 className="w-fit text-lg underline underline-offset-4">To-Do List</h1>
        <TodoForm onTodoAdded={handleTodoAdded} />
        <TodoList todos={todos} onToggleComplete={handleToggleComplete}/>
      </div>
  );
}

export default App;