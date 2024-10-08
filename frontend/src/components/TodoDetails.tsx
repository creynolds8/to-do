import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import TodoForm from "./TodoForm";

interface Todo {
  id: number;
  title: string;
  message: string;
  priority: boolean;
  completed: boolean;
  created_at: string;
}

interface TodoDetailProps {
  onToggleComplete: (id: number, completed: boolean) => void;
  onUpdateTodo: (id: number, title: string, message: string, priority: boolean) => void;
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

  const handleUpdate = async (todo: {id: number, title: string, message: string, priority: boolean}) => {
    if (!todo) return;

    const updatedTitle = todo.title
    const updatedMessage = todo.message
    const updatedPriority = todo.priority
    onUpdateTodo(todo.id, updatedTitle, updatedMessage, updatedPriority);
    setIsEditing(false);
    setTodo((prevTodo) => prevTodo ? {
      ...prevTodo,
      title: updatedTitle,
      message: updatedMessage,
      priority: updatedPriority
    } : null)
  }

  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCompleted = e.target.checked;   
    onToggleComplete(todo.id, updatedCompleted);
    setTodo((prevTodo) => prevTodo ? {...prevTodo, completed: updatedCompleted} : null);
  };
  
  const d = new Date(Date.parse(todo.created_at));
  const formattedDate = d.toLocaleDateString();
  const formattedTime = d.toLocaleTimeString();
  

  return (
    <div className="relative">
    <Link to={'/todos'}>
      <img src="https://raw.githubusercontent.com/creynolds8/to-do/0516c2549a768b2d8562cb4b3387d985ca6832f3/frontend/public/back-arrow.svg" alt="Back" width='20px' className="hover-enlarge lg:w-6"/>
    </Link>
    {isEditing ? (
      <>
        <button className="absolute top-0 right-0" onClick={() => setIsEditing(false)}>
          <img src="https://raw.githubusercontent.com/creynolds8/to-do/0516c2549a768b2d8562cb4b3387d985ca6832f3/frontend/public/cancel.svg" alt="Cancel" width='20px' className="hover-enlarge" />
        </button>
        <TodoForm todo={todo} onSubmit={handleUpdate} />
      </>
    ) : (
      <div className="mt-8">
        <div className="flex items-center">
          <input
          name="todo-checkbox"
          className={`me-4 w-4 h-4 ${todo.completed ? "accent-green-600" : ""}`}
          type="checkbox"
          checked={todo.completed}
          onChange={handleChange}
          />
          <div className="w-full flex justify-between">
            <h1 className="text-2xl">{todo.title}</h1>
            <button onClick={() => setIsEditing(true)}>
              <img src="https://raw.githubusercontent.com/creynolds8/to-do/0516c2549a768b2d8562cb4b3387d985ca6832f3/frontend/public/edit.svg" alt="Edit" width="20px" className="hover-enlarge lg:w-8" />
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <div className="flex justify-between">
            <span className="text-sm">Status:
              <span className="ms-2">
                {todo.completed ?
                <span className="text-green-600">Completed</span> :
                <span className="text-gray-400">Pending</span>
              }
              </span>
            </span>
            {todo.priority && <><img src="https://raw.githubusercontent.com/creynolds8/to-do/0516c2549a768b2d8562cb4b3387d985ca6832f3/frontend/public/priority.svg" alt="!" width="20px" className="lg:w-8" /></>}
          </div>
          <span className="text-sm md:text-base">Created at: {formattedTime}, {formattedDate}</span>
          <span className="underline underline-offset-2 text-lg mt-4">Additional Info:</span>
          <span>{todo.message}</span>
        </div>
      </div>
    )}
  </div>
  );
};

export default TodoDetails;