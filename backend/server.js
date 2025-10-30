import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.models.js";
import productRoutes from "./routes/product.routes.js";
import path from "path";




dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000
const __dirname = path.resolve();

app.use(express.json()); //allows us to accept json data in the req body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/vite-project/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "vite-project", "dist", "index.html"));
	});
}
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
});
