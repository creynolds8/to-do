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


app.get('/api/todos', async (req: Request, res: Response<Todo[]>) => {
  const queryString = "SELECT * FROM todos"
  try {
    const result = await query(queryString)
    res.json(result.rows)
  } catch (error) {
    console.error("Error fetching todos", error)
  }
  // const sortedTodos = [...todos].sort((a, b) => b.id - a.id)  
  // res.json(sortedTodos);
});

app.get('/api/todos/:id', async (req: Request< {id: string }>, res: Response<Todo>) => {
  const { id } = req.params;
  const queryString = "SELECT * FROM todos WHERE id = $1"
  try {
    const result = await query(queryString, [id])
    res.status(200).json(result.rows[0]);
    
  } catch (err) {
    console.error("Error fetching todo", err)
    // res.status(404).json({ message: "Todo not found" })
  }

})

app.post('/api/todos', async (req: Request, res: Response) => {
  const { title, message } = req.body;
  const queryString = "INSERT INTO todos (title, message) VALUES ($1, $2) RETURNING *";

  // commented out as it causes an error on ln 23 "no overload matches call"
  if (!title) {
    return 
    // res.status(400).json({ message: 'Title is required' });
  }

  try {
    const result = await query(queryString, [title, message])
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error("Error adding todo", err)
  }
  
})

// app.patch('/api/todos/:id', (req: Request, res: Response) => {  
//   const { id } = req.params;  
//   const { completed } = req.body as { completed: boolean };
  
//   const todo = todos.find((todo) => todo.id === parseInt(id));
//   if (!todo) {
//     return 
//     // res.status(404).json({ message: 'Todo not found'});
//   }
//   if (typeof completed !== 'boolean') {
//     return 
//     // res.status(400).json({ message: 'Invalid complete status'});
//   }  
//   todo.completed = completed;
//   res.status(200).json(todo)
// })

// app.put('/api/todos/:id', (req: Request, res: Response)=> {
//   const { id } = req.params;  
//   const { title, message } = req.body as { title: string, message: string };  

//   const todo = todos.find((todo) => todo.id === parseInt(id));
//   if (!todo) {
//     return 
//     // res.status(404).json({ message: 'Todo not found' });
//   }
//   todo.title = title;
//   todo.message = message;
//   res.status(200).json(todo);
// })

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});