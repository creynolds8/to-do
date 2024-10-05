import React from "react";
import TodoListItem from "./TodoListItem";

interface Todo {
  id: number;
  title: string;
  message: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: number, completed: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete }) => {
  const todoComponents = todos.map(todo => {
    return (
      <TodoListItem
      key={todo.id}
      todo={todo}
      onToggleComplete={onToggleComplete}
      />
    )
  })
  return (
    <div className="container">
      <ul className="p-4 border-2 rounded outline-gray-400 flex flex-col gap-4">
        {todoComponents}
      </ul>
    </div>
  );
};

export default TodoList;