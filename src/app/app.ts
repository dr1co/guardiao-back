import express, { Request, Response } from "express";
import cors from "cors";
import UserRouter from "../view/userView";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(cors());

app.use(UserRouter);

export default app;
