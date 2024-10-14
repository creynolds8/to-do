import React from "react";
import TodoListItem from "./TodoListItem";

interface Todo {
  todo_id: number;
  todo_title: string;
  message: string;
  priority: boolean;
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
      key={todo.todo_id}
      todo={todo}
      onToggleComplete={onToggleComplete}
      />
    )
  })
  return (
    <div className="container">
      <ul className="p-2 border-2 rounded outline-gray-400 flex flex-col gap-2 max-[350px]:text-xs">
        {todoComponents}
      </ul>
    </div>
  );
};

export default TodoList;