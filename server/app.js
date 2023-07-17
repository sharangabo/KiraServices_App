import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import hospitalRoutes from "./routes/hospital.js";
import cookieParser from "cookie-parser";

const app = express();

// CONFIGURATION

dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES

app.use("/api/hospitals", hospitalRoutes);

// CONNECT TO DB

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`The server is running on PORT: ${PORT}`));
