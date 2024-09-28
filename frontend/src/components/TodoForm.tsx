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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => {setTitle(e.target.value)}}
          placeholder="Add new Todo"
          required
          />
        <button type="submit">Add!</button>
      </form>
    </div>
  );
};

export default TodoForm;