import mongoose, { Model } from "mongoose";
import { PAYMENT_STATUS } from "../constants/Roles.js";
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderCode: {
      type: Number, //payOs yeu cau orderCode là num
      required: true,
      unique: true,
    },
    planId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      // enum: ["Pending", "Paid", "Cancelled", "Failed"],
      enum: Object.values[PAYMENT_STATUS]
    },
    paymentDate: {
      type: Date,
      default: null
    },
  },
  { timestamps: true }
);
const Order = mongoose.model('order', orderSchema)
export default Order