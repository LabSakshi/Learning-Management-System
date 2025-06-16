import { app } from "./app";
require("dotenv").config();
import { connectDB } from "./utils/db";

app.listen(process.env.PORT, () => {
  console.log(`Server is connected with ${process.env.PORT}`);
  connectDB();
});
