import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import logger from "morgan";

import mongoose from "mongoose";

import indexRouter from "./routes/index.js";
import connectDB from "./util/connect.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(logger("short"));
app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// async function connectToMongoDB() {
//   const mongoDB = process.env.MONGO_URL;
  
//   try {
//     const mongo = await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log(mongo);
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }

connectDB();

app.get('/api', (req,res)=>{
  res.send("This route works")
})
app.use("/", indexRouter);

app.use("*", (req, res, next) => {
  res.status(405).json({
    success: false,
    message: "Method Not Allowed!",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port: ${process.env.PORT}.`);
});

export default app;
