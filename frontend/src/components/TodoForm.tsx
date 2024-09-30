import { useState } from "react";
import axios from "axios";

interface TodoFormProps {
  onTodoAdded: (newTodo: { id: number, title: string, completed: boolean }) => void
}

const TodoForm = ({ onTodoAdded }: TodoFormProps) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please add a valid title.') 
      return;
    }

    try {
      const response = await axios.post('/api/todos', { title });
      onTodoAdded(response.data);
      setTitle('');
    } catch (error) {
      console.log('Error adding todo', error);
    }
  }
  return (
    <div className="container my-4 flex flex-col items-center">
      <h2>Add a new Todo:</h2>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input
          className="p-1 border-2 rounded outline-gray-400"
          type="text"
          value={title}
          onChange={e => {setTitle(e.target.value)}}
          placeholder="Title"
          required
          />
        <button className="w-fit my-2 py-1 px-4 border-2 rounded hover:border-green-600" type="submit">Add!</button>
      </form>
    </div>
  );
};

export default TodoForm;