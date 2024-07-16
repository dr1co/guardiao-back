import dotenv from "dotenv";

import app from "./app/app.js";

dotenv.config();
const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
