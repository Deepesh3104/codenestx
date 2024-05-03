import express from "express";
import cors from "cors";
import connectDB from "./src/Db/db.js";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auths.route.js";
import productRoutes from "./src/routes/product.route.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
