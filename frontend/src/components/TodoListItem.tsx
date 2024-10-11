import React from "react";
import { Link } from "react-router-dom";

interface Todo {
  id: number;
  title: string;
  message: string;
  priority: boolean;
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
    <li className="p-4 bg-gray-100 rounded">
      <div className="flex justify-between">
        <div className="flex items-center">
          <input
            name="todo-checkbox"
            className={`me-4 w-4 h-4 ${todo.completed ? "accent-green-600" : ""}`}
            type="checkbox"
            checked={todo.completed}
            onChange={handleChange}
            />
          {todo.title}
        </div>
        <div className="flex items-center gap-4">
          {todo.message && <span className="italic text-xs lg:text-base">More info</span>}
          <Link to={`/todos/${todo.id}`} className="">
            <img src="https://raw.githubusercontent.com/creynolds8/to-do/0516c2549a768b2d8562cb4b3387d985ca6832f3/frontend/public/three-dots.svg" alt="View" width="16px" className="hover-enlarge lg:w-6" />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="max-[350px]:text-xs text-sm lg:text-base">Status:
          <span className="ms-2">
            {todo.completed ?
            <span className="text-green-600">Completed</span> :
            <span className="text-gray-400">Pending</span>
          }
          </span>
        </span>
        {todo.priority && <><img src="https://raw.githubusercontent.com/creynolds8/to-do/0516c2549a768b2d8562cb4b3387d985ca6832f3/frontend/public/priority.svg" alt="!" width="16px" className="lg:w-6" /></>}
      </div>
    </li>
  )
}

export default TodoListItem;