import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import stdMenRouter from "./Routers/studentMentor.router.js";
import connectDB from "./Database/dbconfig.js";
dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api", stdMenRouter);

app.listen(port, () => {
  console.log("app is listening with", port);
});