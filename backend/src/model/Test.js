import mongoose, { Schema } from "mongoose";
import { timeStamp } from "node:console";
import { type } from "node:os";
import { title } from "node:process";
import slug from "mongoose-slug-updater"; 

mongoose.plugin(slug);
const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  options: [
    {
      text: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

const testSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    folderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
    authorId: {
      type: String,
      ref: "User",
      visibility: Boolean,
    },
    slug: {
      type: String,
      slug: "title", // Tự động lấy giá trị từ trường 'name' để tạo slug
      unique: true, // Đảm bảo không có 2 slug trùng nhau
    },
    duration: {
      type: Number,
      default: 60,
    },
    questions: [questionSchema],
  },
  {
    timestamp: true,
  }
);

const Test = mongoose.model("Tests", testSchema);

export default Test;
