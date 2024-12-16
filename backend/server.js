import dotenv from "dotenv";
import express from "express";
import { ConnectDB } from "./config/db.js";
import router from "./routes/product.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

console.log(process.env.MONGO_URI);

app.use("/api/product", router);

app.listen(PORT, () => {
  ConnectDB();
  console.log("Server started at http://localhost: " + PORT);
});
