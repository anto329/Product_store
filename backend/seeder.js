import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.models.js";

dotenv.config();

const sampleProducts = Array.from({ length: 100 }, (_, i) => ({
  name: `Sample Product ${i + 1}`,
  image: `https://picsum.photos/200?random=${i + 1}`,
  price: (Math.random() * 100).toFixed(2),
  description: `This is the description for product ${i + 1}.`,
}));

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // optional: clear existing products
    await Product.insertMany(sampleProducts);
    console.log("✅ 100 Products added successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error adding products:", error);
    process.exit(1);
  }
};

importData();
