import dotenv from "dotenv";
import express from "express";
import { ConnectDB } from "./config/db.js";
import router from "./routes/product.route.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

console.log(process.env.MONGO_URI);

app.use("/api/product", router);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
  ConnectDB();
  console.log("Server started at http://localhost: " + PORT);
});
