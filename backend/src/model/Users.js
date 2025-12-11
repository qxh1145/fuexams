import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    hashedPassword: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    displayName: {
      type: String,
      require: true,
      trim: true,
    },
    avatarUrl: {
      type: String,
    },
    avatarId: {
      type: String,
    },
    phone: {
      type: String,
      sparse: true, //cho phep null, nhung ko dc trung
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
