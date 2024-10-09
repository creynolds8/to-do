import express, { Request, Response } from 'express';
import cors from 'cors';
// @ts-expect-error
import {query} from '../database/db.ts';

const app = express();
const PORT = 8000;

interface Todo {
  id: number;
  title: string;
  message: string;
  completed: boolean;
}

app.use(cors());

app.use(express.json());

//get all todos
app.get('/api/todos', async (req: Request, res: Response) => {
  const queryString = "SELECT * FROM todos ORDER BY created_at DESC;";
  try {
    const result = await query(queryString);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching todos", err);
  };
});

// get individual todo
app.get('/api/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const queryString = "SELECT * FROM todos WHERE id = $1;";
  try {
    const result = await query(queryString, [id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching todo", err);
  };
});

// add new todo 
app.post('/api/todos', async (req: Request, res: Response) => {
  const { title, message } = req.body as { title: string, message: string };
  const queryString = "INSERT INTO todos (title, message) VALUES ($1, $2) RETURNING *;";
  try {
    const result = await query(queryString, [title, message]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding todo", err);
  };
});

// update completed status based on checkbox input 
app.patch('/api/todos/:id', async (req: Request, res: Response) => {  
  const { id } = req.params;  
  const { completed } = req.body as { completed: boolean };  
  const queryString = "UPDATE todos SET completed = $1 WHERE id = $2;";
  try {
    const result = await query(queryString, [completed, id]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error completing todo", err);
  };
});

app.put('/api/todos/:id', async (req: Request, res: Response)=> {
  const { id } = req.params;  
  const { title, message } = req.body as { title: string, message: string };  
  const queryString = "UPDATE todos SET title = $1, message = $2 WHERE id = $3 RETURNING *;";

  try {
    const result = await query(queryString, [title, message, id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating todo", err);
  };
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});