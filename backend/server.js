import dotenv from "dotenv";
import express from "express";
import { ConnectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  ConnectDB();
  console.log("Server started at http://localhost:5000");
});
