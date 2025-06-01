import express from 'express'


import authUser from '../middleware/auth.js'
import { allOrders, placeOrder, placeOrderRazorPay, placeOrderStripe, userOrders, updateStatus } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter=express.Router()

orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorPay)
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter