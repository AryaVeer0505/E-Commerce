import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl,currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        console.error("Failed to fetch orders:", response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const statusHandler=async(event,orderId)=>{ 
    try {
      const response=await axios.post(backendUrl+"/api/order/status",{orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders
      }
    } catch (error) {
       console.error("Error fetching orders:", error);
      toast.error(error.message);
    }
    }
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      <div>
        {orders.map((order, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
            <img
              src={assets.parcel_icon}
              alt="Parcel Icon"
              className="w-8 h-8 mb-2"
            />

            <div>
              <div>
                {order.items.map((item, itemIndex) => {
                  if (itemIndex === order.items.length - 1) {
                    return (
                      <p key={itemIndex}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={itemIndex}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p>Items:{order.items.length}</p>
              <p>Method:{order.paymentMethod}</p>
              <p>Payment:{order.payment?"Done":"Pending"}</p>
              <p>Date:{new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p>{currency}{order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="p-2 font-semibold" >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
