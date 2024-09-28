import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

app.use(cors());

app.use(express.json());

app.get('/api/todos', (req: Request, res: Response) => {
  const todos = [
      { id: 1, title: 'Learn TypeScript', completed: false },
      { id: 2, title: 'Build a To-Do App', completed: false }
  ];
  res.json(todos);
});

app.post('/api/todos', (req: Request, res: Response) => {
  const { title } = req.body;
  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false
  };
  res.status(201).json(newTodo)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});