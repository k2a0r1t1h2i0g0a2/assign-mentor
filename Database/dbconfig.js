import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODBCONNECTIONSTRING;
    const connection = await mongoose.connect(mongoUrl);
    console.log("connected to the MongoDb");
    return connection;
  } catch (error) {
    console.error("error", error);
  }
};

export default connectDB;
