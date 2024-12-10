import express, { Request, Response } from "express";
import cors from "cors";
import { query } from "../database/db";
import bcrypt from "bcryptjs";
import cookieSession from "cookie-session";
import dotenv from "dotenv";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

interface Todo {
  id: number;
  title: string;
  message: string;
  completed: boolean;
}

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(cookieSession({
  name: "session",
  keys: ["64321684"],
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: "none",
  secure: false,
}));

app.use(express.json());

// TODO ROUTES 

  //get all *ACTIVE* todos
  app.get("/api/todos", async (req: Request, res: Response) => {
    let userId;
    if (req.session) {
      userId = req.session.userId;
    }
    const queryString = `
      SELECT * FROM todos 
      JOIN todo_lists ON todos.todo_list_id = todo_lists.list_id
      WHERE todo_lists.user_id = $1
      AND todos.active = TRUE 
      ORDER BY todos.created_at DESC;
    `;
    try {
      const result = await query(queryString, [userId]);           
      res.json(result.rows);
    } catch (err) {
      console.error("Error fetching todos", err);
    };
  });

  // get individual todo
  app.get("/api/todos/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const queryString = "SELECT * FROM todos WHERE todo_id = $1;";
    try {
      const result = await query(queryString, [id]);
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error("Error fetching todo", err);
    };
  });

  // add new todo 
  app.post("/api/todos", async (req: Request, res: Response) => {
    let listResults;
    console.log('req.session', req.session)
    if (req.session) {
      listResults = await query("SELECT * FROM todo_lists WHERE user_id = $1;", [req.session.userId])
    }
    const { title, message, priority } = req.body as { title: string, message: string, priority: boolean };
    const queryString = "INSERT INTO todos (todo_title, message, priority, todo_list_id) VALUES ($1, $2, $3, $4) RETURNING *;";
    try {   
      console.log('listResults', listResults);
         
      const result = await query(queryString, [title, message, priority, listResults.rows[0].list_id]);    
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.log('catch', req.session);
      
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
      queryString = "UPDATE todos SET completed = $1 WHERE todo_id = $2;";
      data = completed;
    }
    if (typeof active !== "undefined") {    
      queryString = "UPDATE todos SET active = $1 WHERE todo_id = $2;";
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
  app.put("/api/todos/:id", async (req: Request, res: Response) => {
    const { id } = req.params;  
    const { title, message, priority } = req.body as { title: string, message: string, priority: boolean };  
    const queryString = "UPDATE todos SET todo_title = $1, message = $2, priority = $3 WHERE todo_id = $4 RETURNING *;";

    try {
      const result = await query(queryString, [title, message, priority, id]);
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error("Error updating todo", err);
    };
  });

  // USER ROUTES

  app.get("/api/users", async (req: Request, res: Response) => {

    const queryString = "SELECT * FROM users WHERE id = $1;";
    try {
      if (req.session) {
        const result = await query(queryString, [req.session.userId]);
        res.json(result.rows[0]);
      } else {
        console.error("Null session");
      };
    } catch (error) {
      console.error("User not found", error);
    };
  });

  app.post("/api/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const queryString = "SELECT * FROM users WHERE email = $1;"
    try {
      const result = await query(queryString, [email])
      if (req.session) {
        if (result.rows.length > 0) {
          const digestCheck = result.rows[0].password_digest;
          const passwordCheck = bcrypt.compareSync(password, digestCheck);
          if (passwordCheck) {
            console.log('result', result);
            
            console.log('**pre', req.session);
            
            req.session.userId = result.rows[0].id;

            console.log('**post', req.session);
            
            res.status(201).json(result.rows[0])
          } else {
            res.status(404).json("Incorrect Password.");
          }
        } else {
          res.status(404).json("User not found.");
        };  
      };
    } catch (error) {
      console.error("Login error", error)
      res.status(404).json(error)
    }
  });

  app.post("/api/register", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const queryString = "INSERT INTO users (email, password_digest) VALUES ($1, $2) RETURNING *;";    
    const salt = bcrypt.genSaltSync(10);
    const password_digest = bcrypt.hashSync(password, salt);
    
    try {
      const result = await query(queryString, [email, password_digest]);
      if (req.session) {
        req.session.userId = result.rows[0].id
        query("INSERT INTO todo_lists (user_id, list_title) VALUES ($1, $2);", [req.session.userId, "Default"])
        res.status(201).json(result.rows[0]);
      }
    } catch (error) {
      console.error("Error adding user to database", error);
    }
  });

  app.post("/api/logout", (req: Request, res: Response) => {    
    req.session = null
    res.status(201).json();
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});