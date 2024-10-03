import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoDetailProps {
  onToggleComplete: (id: number, completed: boolean) => void;
}

const TodoDetails: React.FC<TodoDetailProps> = ({ onToggleComplete }) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCompleted = e.target.checked;   
    onToggleComplete(todo.id, updatedCompleted);
    setTodo((prevTodo) => prevTodo ? {...prevTodo, completed: updatedCompleted} : null);
  };

  return (
    <div>
      <Link to={'/'}>
        <img src="/back-arrow.svg" alt="Back" width='20px' className="hover-enlarge"/>
      </Link>
      <div className="mt-8">
        <div className="flex items-center">

      <input
      className={`me-4 w-4 h-4 ${todo.completed ? "accent-green-600" : ""}`}
      type="checkbox"
      checked={todo.completed}
      onChange={handleChange}
      />
        <h1 className="text-2xl">{todo.title}</h1>
      </div>
        <span className="text-sm">Status: 
          <span className="ms-2 text-gray-400">{todo.completed ? 'Completed' : 'Pending'}</span>
        </span>      
      </div>
    </div>
  );
};

export default TodoDetails;