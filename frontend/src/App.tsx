import { useEffect, useState } from "react";
import axios from 'axios';
import TodoForm from "./components/TodoForm";

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
      console.log('Error fetching Todos', error);
      
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

  return (
      <div>
        <h1>To-Do List</h1>
        <TodoForm onTodoAdded={handleTodoAdded} />
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
                {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
            </li>
            ))}
        </ul>
      </div>
  );
}

export default App;