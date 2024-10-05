import React from "react";
import { Link } from "react-router-dom";

interface Todo {
  id: number;
  title: string;
  message: string;
  completed: boolean;
}

interface TodoListItemProps {
  todo: Todo;
  onToggleComplete: (id: number, completed: boolean) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onToggleComplete }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    onToggleComplete(todo.id, e.target.checked);
  };

  return (
    <li className="p-2 bg-gray-100 rounded">
      <div className="flex items-center justify-between">
        <div>
          <input
            className={`me-4 w-4 h-4 ${todo.completed ? "accent-green-600" : ""}`}
            type="checkbox"
            checked={todo.completed}
            onChange={handleChange}
            />
          {todo.title}
        </div>
        <div className="flex gap-4">
          {todo.message && <span className="italics text-xs lg:text-base">More info</span>}
          <Link to={`/todos/${todo.id}`} className="">
            <img src="/three-dots.svg" alt="View" width="16px" className="hover-enlarge" />
          </Link>
        </div>
      </div>
      <span className="text-sm lg:text-base">Status:
        <span className="ms-2 text-gray-400">{todo.completed ? 'Completed' : 'Pending'}</span>
      </span>
    </li>
  )
}

export default TodoListItem;