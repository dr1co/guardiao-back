import express, { Request, Response } from "express";
import cors from "cors";
import UserRouter from "../view/userView";
import ChildRouter from "../view/childView";
import AlertRouter from "../view/alertView";
import ContentRouter from "../view/contentView";

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

// app usa a rota
app.use(UserRouter);
app.use(ChildRouter);
app.use(ContentRouter);
app.use(AlertRouter);

export default app;
