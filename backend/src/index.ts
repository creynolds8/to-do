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

app.get('/api/todos', (req: Request, res: Response<Todo[]>) => {
  const sortedTodos = [...todos].sort((a, b) => b.id - a.id)  
  res.json(sortedTodos);
});

app.get('/api/todos/:id', (req: Request< {id: string }>, res: Response<Todo | { message: string }>) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === parseInt(id));

  if (!todo) {
    return 
    // res.status(404).json({ message: "Todo not found" })
  }
  res.status(200).json(todo);
})

app.post('/api/todos', (req: Request, res: Response) => {
  const { title } = req.body;

  // commented out as it causes an error on ln 23 "no overload matches call"
  if (!title) {
    return 
    // res.status(400).json({ message: 'Title is required' });
  }
  
  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false
  };
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

app.patch('/api/todos/:id', (req: Request, res: Response) => {  
  const { id } = req.params;  
  const { completed } = req.body as { completed: boolean };
  
  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (!todo) {
    return 
    // res.status(404).json({ message: 'Todo not found'});
  }
  if (typeof completed !== 'boolean') {
    return 
    // res.status(400).json({ message: 'Invalid complete status'});
  }  
  todo.completed = completed;
  res.status(200).json(todo)
})

app.put('/api/todos/:id', (req: Request, res: Response)=> {
  const { id } = req.params;  
  const { title } = req.body as { title: string };  

  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (!todo) {
    return 
    // res.status(404).json({ message: 'Todo not found' });
  }
  todo.title = title;  
  res.status(200).json(todo);
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});