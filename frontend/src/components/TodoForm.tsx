import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

interface TodoFormProps {
  todo?: { todo_id: number; todo_title: string; message: string; priority: boolean; completed: boolean };
  onSubmit: (todo: { todo_id: number; todo_title: string; message: string; priority: boolean; completed: boolean; }) => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit}) => {
  const [title, setTitle] = useState<string>(todo ? todo.todo_title : "");
  const [message, setMessage] = useState<string>(todo ? todo.message : "");
  const [priority, setPriority] = useState<boolean>(todo? todo.priority : false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.todo_title);
      setMessage(todo.message);
    };
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check for only white space inputs
    if (!title.trim()) {
      alert("Please add a valid title.");
      return;
    }
    try {
      // if todo is not set, info will be posted as a new todo
      if (!todo) {
        const response = await api.post("/api/todos", { title, message, priority });        
        onSubmit({ ...response.data });        
        setTitle("");
        setMessage("");
        setPriority(false);
      // otherwise info is used to update the todo
      } else {        
        const response = await api.put(`/api/todos/${todo.todo_id}`, { title, message, priority });            
        onSubmit({ ...response.data });
      }
    } catch (error) {
      console.error("Error adding todo", error);
    };
  };
  
  return (
    <div className="container my-4 flex flex-col items-center">
      <h2>{todo ? "Update Todo:" : "Add a new Todo:"}</h2>
      <form className="flex flex-col items-center gap-2" onSubmit={handleSubmit}>
        <input
          className="p-1 border-2 rounded outline-gray-400"
          type="text"
          name="title"
          value={title}
          onChange={e => {setTitle(e.target.value)}}
          placeholder="Title"
          maxLength={20}
          autoFocus
          required
        />
        <textarea
          className="p-1 border-2 rounded outline-gray-400"
          name="message"
          value={message}
          onChange={e => {setMessage(e.target.value)}}
          placeholder="Additional Info..."
          maxLength={100}
          rows={3}
        />
        <div className="flex items-center">
          <label htmlFor="priority-checkbox">Priority task:</label>
          <input
            className={`ms-4 w-4 h-4 ${priority ? "accent-red-500" : ""}`}
            type="checkbox"
            id="priority-checkbox"
            checked={priority}
            onChange={(e) => setPriority(e.target.checked)}
            />
        </div>
        <button
          className="w-fit my-2 button success hover:bg-green-600"
          type="submit"
          >
          {todo ? "Update Todo" : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;