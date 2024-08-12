import express, {Request, Response} from "express";
import cors from "cors";

import connection from "../database/postgres";

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get("/example", (req: Request, res: Response) => {
  res.send("Hello World!");
})

app.use(express.json());
app.use(cors());

export default app;
