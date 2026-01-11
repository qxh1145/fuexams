import {PayOS} from "@payos/node";
import Order from "../model/Order.js";
import dotenv from 'dotenv'
import User from "../model/Users.js";   // Nhớ import Model User

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
      returnUrl: `${frontendBaseUrl}/upgrade/success`,
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
    console.log('PayOs Webhook recived: ', req.boy)

    const {success, data} = req.body

    if(!data || !data.orderCode) {
      return res.status(400).json({success: false})
    }
};
