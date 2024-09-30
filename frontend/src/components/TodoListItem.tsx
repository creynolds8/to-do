import React from "react";

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
    </li>
  )
}

export default TodoListItem;