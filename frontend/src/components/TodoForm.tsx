import { useEffect, useState } from "react";
import axios from "axios";

interface TodoFormProps {
  todo?: { id: number; title: string; completed: boolean;};
  onSubmit: (todo: { id: number; title: string; completed: boolean }) => void
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit }) => {
  const [title, setTitle] = useState<string>(todo ? todo.title : "");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
    }
  },[todo])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please add a valid title.') 
      return;
    }

    try {
      if (!todo) {
        
        const response = await axios.post('/api/todos', { title });        
        onSubmit({ ...response.data });        
        setTitle('');        
      } else {        
        const response = await axios.put(`/api/todos/${todo.id}`, { title })        
        onSubmit({id: response.data.id, title: response.data.title, completed: response.data.completed })
      }
    } catch (error) {
      console.error('Error adding todo', error);
    }
  }
  return (
    <div className="container my-4 flex flex-col items-center">
      <h2>{todo ? "Update Todo" : "Add Todo"}</h2>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input
          className="p-1 border-2 rounded outline-gray-400"
          type="text"
          name="title"
          value={title}
          onChange={e => {setTitle(e.target.value)}}
          placeholder="Title"
          maxLength={25}
          required
          />
        <button className="w-fit my-2 py-1 px-4 border-2 rounded hover:border-green-600" type="submit">{todo ? "Update Todo" : "Add Todo"}</button>
      </form>
    </div>
  );
};

export default TodoForm;