import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import TodoForm from "./TodoForm";

interface Todo {
  id: number;
  title: string;
  message: string;
  completed: boolean;
}

interface TodoDetailProps {
  onToggleComplete: (id: number, completed: boolean) => void;
  onUpdateTodo: (id: number, title: string, message: string) => void;
}

const TodoDetails: React.FC<TodoDetailProps> = ({ onToggleComplete, onUpdateTodo }) => {
  const { id } = useParams<{ id: string }>();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
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

  const handleUpdate = async (todo: {id: number, title: string, message: string}) => {
    if (!todo) return;
    
    const updatedTitle = todo.title
    const updatedMessage = todo.message
    onUpdateTodo(todo.id, updatedTitle, updatedMessage);
    setIsEditing(false);
    setTodo((prevTodo) => prevTodo ? { ... prevTodo, title: updatedTitle, message: updatedMessage} : null)
  }


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCompleted = e.target.checked;   
    onToggleComplete(todo.id, updatedCompleted);
    setTodo((prevTodo) => prevTodo ? {...prevTodo, completed: updatedCompleted} : null);
  };

  return (
    <div className="relative">
    <Link to={'/'}>
      <img src="/back-arrow.svg" alt="Back" width='20px' className="hover-enlarge"/>
    </Link>
    {isEditing ? (
      <>
        <button className="absolute top-0 right-0" onClick={() => setIsEditing(false)}>
          <img src="/cancel.svg" alt="Cancel" width='20px' className="hover-enlarge" />
        </button>
        <TodoForm todo={todo} onSubmit={handleUpdate} />
      </>
    ) : (
      <div className="mt-8">
        <div className="flex items-center">
          <input
          className={`me-4 w-4 h-4 ${todo.completed ? "accent-green-600" : ""}`}
          type="checkbox"
          checked={todo.completed}
          onChange={handleChange}
          />
          <div className="w-full flex justify-between">
            <h1 className="text-2xl">{todo.title}</h1>
            <button onClick={() => setIsEditing(true)}>
              <img src="/edit.svg" alt="Edit" width="20px" className="hover-enlarge" />
            </button>
          </div>
        </div>
        <span className="text-sm">Status:
          <span className="ms-2">
            {todo.completed ?
            <span className="text-green-600">Completed</span> :
            <span className="text-gray-400">Pending</span>
            }
          </span>
        </span>      
        <div className="flex flex-col mt-4">
          <span className="underline underline-offset-2 text-lg">Additional Info:</span>
          <span className="text-sm md:text-base">{todo.message}</span>
        </div>
      </div>
    )}
  </div>
  );
};

export default TodoDetails;