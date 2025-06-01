
import orderModel from "../models/order.model.js";
import userModel from "../models/userModel.js";
export const placeOrder = async (req, res) => {
  try {
    const {userId,items,amount,address}=req.body 

    const orderData={
        userId,
        items,
        address,
        amount,
        paymentMethod:"COD",
        payment:false,
        date:Date.now()
    }
 
    const newOrder=new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId,{cartData:{}})

    res.json({
        success:true,
        message:"Order Placed"
    })

  } catch (error) {
    console.log(error);
     res.json({
        success:false,
        message:error.message
    })
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
     res.json({
        success:false,
        message:error.message
    })
  }
};

export const placeOrderRazorPay = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
     res.json({
        success:false,
        message:error.message
    })
  }
};

export const allOrders = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
     res.json({
        success:false,
        message:error.message
    })
  }
};

export const userOrders = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
     res.json({
        success:false,
        message:error.message
    })
  }
};

export const updateStatus = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
