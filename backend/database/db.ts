const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'cam',
  host: 'localhost',
  database: 'todo_app',
  password: 'root',
  port: 5432,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);