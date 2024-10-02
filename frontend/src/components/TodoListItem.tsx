import React from "react";
import { Link } from "react-router-dom";

interface Todo {
  id: number;
  title: string;
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
    <li  className="flex justify-start items-center">
      <input
      className={`me-4 w-4 h-4 ${todo.completed ? "accent-green-600" : ""}`}
      type="checkbox"
      checked={todo.completed}
      onChange={handleChange}
      />
      {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
      <Link to={`/todos/${todo.id}`} className="me-0 ms-auto">View</Link>
    </li>
  )
}

export default TodoListItem;