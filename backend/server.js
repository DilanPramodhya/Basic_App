import dotenv from "dotenv";
import express from "express";
import { ConnectDB } from "./config/db.js";
import router from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json());

console.log(process.env.MONGO_URI);

app.use("/api/product", router);

app.listen(5000, () => {
  ConnectDB();
  console.log("Server started at http://localhost:5000");
});
