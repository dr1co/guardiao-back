import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const connection = new Pool({
  user: process.env.POSTGRES_USER, //variável de ambiente para usuário postgres
  password: process.env.POSTGRES_PASSWORD, //variável de ambiente para senha
  host: "localhost",
  port: 5432,
  database: "guardiao_dev",
});

export default connection;
