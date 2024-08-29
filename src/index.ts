// configuração e inicialização de um servidor em Node.js

import dotenv from "dotenv";

import app from "./app/app";

dotenv.config();
const PORT = Number(process.env.PORT);

const bcrypt = Number(process.env.BCRYPT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, key is ${bcrypt}`);
});
