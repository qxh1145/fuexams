import {PayOS} from "@payos/node";
import Order from "../model/Order.js";
import dotenv from 'dotenv'
import User from "../model/Users.js";   // Nhớ import Model User
import { ROLES } from "../constants/Roles.js";

dotenv.config() //truy cap bien moi truong phai confug dotenv

//khoi tao cac key can thiet cau pay os
const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

//bang gia niem yet
const PLAN_PRICES = {
  "1 Month": 29000,
  "3 Month": 69000,
  "1 Year": 399000,
};

export const createPaymentLink = async (req, res) => {
  try {
    const { planId } = req.body;
    const user = req.user;

    if (!PLAN_PRICES[planId]) {
      return res.status(400).json({ message: "Not a valid plant id" });
    }
    //tao ma don hang
    //payos yeu cau mang don hang phai la number
    const orderCode = Number(String(Date.now()).slice(-6));

    const frontendBaseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_BASE_URL
        : "http://localhost:5173";

    //data gui len payos
    const body = {
      orderCode: orderCode,
      amount: PLAN_PRICES[planId],
      description: `Upgrade ${planId}`,
      cancelUrl: `${frontendBaseUrl}/cancel`,
      returnUrl: `${frontendBaseUrl}/home`,
    };
    console.log('test: ', body)
    //goi payos lay link
    const paymentLinkResponse = await payos.paymentRequests.create(body); 

    console.log(paymentLinkResponse);

    const amountPrice = PLAN_PRICES[planId]
    const newOrder = new Order({
      userId: user._id,
      planId: planId,
      orderCode: orderCode,
      amount: amountPrice,
      status: "Pending",
      paymentDate: new Date(),
    });

    await newOrder.save();

    return res.status(200).json({
      checkoutUrl: paymentLinkResponse.checkoutUrl,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: 'Error while process payment: ', error});
  }
};


export const handlePayOSOrder = async (req, res) => {
    console.log('PayOs Webhook recived: ', req.body)

    const {success, data} = req.body

    if(!data || !data.orderCode) {
      return res.status(400).json({success: false})
    }
    //tim don hang dua tren order code (PayOS gui ve)
    const order = await Order.findOne({orderCode:data.orderCode})

    if(!order){
      console.log('Can not find order, please try again.')
      return res.json({success: false})
    }
    //kiem tra don hang da xu ly roi, neu co thi bo qua

    if(data.status === 'Paid'){
      console.log("Already paid....")
      return res.json({success: true})
    }

    //cap nhat database

    try {
      order.status = 'Paid'
      await order.save()

      await User.findByIdAndUpdate(order.userId, {
        role: ROLES.PREMIUM,
        plan: order.planId,
        plantStartDate: new Date()
      })
      console.log("Update success");
    } catch (error) {
      console.error("Update failed...")
    }

    //luon tra ve success true de PayOS khong goi lai nuwa

    return res.json({success: true})
};


// Payment crud
export const getAllOrders = async (req,res) => {
  try {
    const orders = await Order.find()
    .populate("userId", "username email").exec();
    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error while fetch all orders ", error);
    return res.status(500).json({message: "Error while fetch all orders"})
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const {orderCode} = req.body;
    const response = await Order.findOneAndDelete({"orderCode": orderCode});
    if(!response){
      return res.status(404).json({message: "Cannot find orderCode to delete"})
    }
    console.log("Deleted ", orderCode);
    return res.status(200).json({message: "Delete success"})
  }catch (error){
    return res.status(500).json({message: "Unexpected token"})
  }
}
export const updateUser = async (req, res) => {
  try {
    const { newStatus } = req.body;
    const response = await Order.findByIdAndUpdate(
      req.params.orderCode,
      {$set: {status: newStatus} },
      {new: true}
    )

    if(!response){
      return res.status(404).json({message: "cannot find transaction"})
    }
    console.log('update success')
    return res.status(200).json({message: "update success"})
  } catch (error) {
    return res.status(500).json({message: "error", error})
  }
}