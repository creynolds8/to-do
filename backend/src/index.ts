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

const todos: Todo[] = [];

app.get('/api/todos', (req: Request, res: Response) => {  
  res.json(todos);
});

app.post('/api/todos', (req: Request, res: Response) => {
  const { title } = req.body;

  // commented out as it causes an error on ln 23 "no overload matches call"
  // if (!title) {
  //   return res.status(400).json({ message: 'Title is required' });
  // }
  
  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false
  };
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});