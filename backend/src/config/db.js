import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    console.log("URI nhận được:", process.env.MONGODB_CONNECTION_STRING);

    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("connected success to db");
  } catch (error) {
    console.log("fail to connect to db: ", error);
    process.exit(1);
  }
};
