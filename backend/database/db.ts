const dotenv = require("dotenv");
dotenv.config();

const Pool = require("pg").Pool;
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_DEV_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);