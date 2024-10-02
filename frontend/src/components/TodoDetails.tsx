import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [todo, setTodo] = useState<Todo | null>(null);
  
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`/api/todos/${id}`);
        setTodo(response.data);
      } catch (error) {
        console.error('Error fetching todo', error);
      }
    };
    
    fetchTodo();
    
  },[id]);
  
  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl">{todo.title}</h1>
      <p>{todo.completed ? "Completed!": "Pending..."}</p>
    </div>
  );
};

export default TodoDetails;