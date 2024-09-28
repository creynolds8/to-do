import { useEffect, useState } from "react";
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const App = () => {
  const [ todos, setTodos ] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const response = await axios.get('/api/todos');
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
      <div>
        <h1>To-Do List</h1>
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