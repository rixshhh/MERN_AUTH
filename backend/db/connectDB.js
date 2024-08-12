import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected : ${connectionDB.connection.host}`);
  } catch (error) {
    console.log("Error in connecting MongoDB", error.message);
    process.exit(1); // 1 is failure , 0 status is success
  }
};
