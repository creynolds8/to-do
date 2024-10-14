import express, { Request, Response } from "express";
import cors from "cors";
import { query } from "../database/db";

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

// TODO ROUTES 

  //get all *ACTIVE* todos
  app.get("/api/todos", async (req: Request, res: Response) => {
    const queryString = "SELECT * FROM todos WHERE active = TRUE ORDER BY created_at DESC;";
    try {
      const result = await query(queryString);
      res.json(result.rows);
    } catch (err) {
      console.error("Error fetching todos", err);
    };
  });

  // get individual todo
  app.get("/api/todos/:id", async (req: Request, res: Response) => {
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
  app.post("/api/todos", async (req: Request, res: Response) => {
    const { title, message, priority } = req.body as { title: string, message: string, priority: boolean };
    const queryString = "INSERT INTO todos (title, message, priority) VALUES ($1, $2, $3) RETURNING *;";
    try {
      const result = await query(queryString, [title, message, priority]);    
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Error adding todo", err);
    };
  });

  // update completed status based on checkbox input ( complete / priority status )
  app.patch("/api/todos/:id", async (req: Request, res: Response) => {  
    const { id } = req.params;  
    const { completed, active } = req.body as { completed: boolean, active: boolean };
    let queryString = "";
    let data;  
    if (typeof completed !== "undefined") {
      queryString = "UPDATE todos SET completed = $1 WHERE id = $2;";
      data = completed;
    }
    if (typeof active !== "undefined") {    
      queryString = "UPDATE todos SET active = $1 WHERE id = $2;";
      data = active;
    }
    try {
      await query(queryString, [data, id]);    
      const result = await query("SELECT * FROM todos WHERE active = true ORDER BY created_at DESC;");
      res.json(result.rows);
    } catch (err) {
      console.error("Error completing todo", err);
    };
  });

  // update todo from form in todo details
  app.put("/api/todos/:id", async (req: Request, res: Response)=> {
    const { id } = req.params;  
    const { title, message, priority } = req.body as { title: string, message: string, priority: boolean };  
    const queryString = "UPDATE todos SET title = $1, message = $2, priority = $3 WHERE id = $4 RETURNING *;";

    try {
      const result = await query(queryString, [title, message, priority, id]);
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error("Error updating todo", err);
    };
  });

  // USER ROUTES

  app.post("/api/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const queryString = "SELECT * FROM users WHERE email = $1;"
    try {
      const result = await query(queryString, [email])      
      if (result.rows.length > 0) {
        const passwordCheck = result.rows[0].password_digest
        if (passwordCheck === password) {
          res.status(201).json(result.rows[0])
        } else {
          res.status(404).json("Incorrect Password.");
        }
      } else {
        res.status(404).json("User not found.")
      }
    } catch (error) {
      console.error("Login error", error)
      res.status(404).json(error)
    }
  });

  app.post("/api/register", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const queryString = "INSERT INTO users (email, password_digest) VALUES ($1, $2) RETURNING *;";    
    try {
      const result = await query(queryString, [email, password]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error adding user to database", error);
    }
  })

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});