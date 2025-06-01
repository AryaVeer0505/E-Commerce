import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token },
      });

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
       await  fetchList()
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-3 text-lg font-semibold">All Product List</p>

      <div className="flex flex-col gap-3">

        <div className="hidden md:grid grid-cols-[95px_1fr_1fr_1fr_80px] items-center py-2 px-4 bg-gray-100 text-sm font-semibold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[60px_1fr_1fr] md:grid-cols-[80px_1fr_1fr_1fr_80px] items-center gap-2 md:gap-4 py-2 px-4 rounded hover:bg-gray-50 transition-all"
          >
            <img
              src={item.image[0]}
              alt="Product"
              className="w-12 h-12 object-cover rounded"
            />
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-sm text-gray-600">{item.category}</p>
            <p className="text-sm hidden md:block">
              {currency}
              {item.price}
            </p>
            <p onClick={()=>removeProduct(item._id)} className=" md:text-center text-right text-red-500 cursor-pointer text-lg hover:scale-110 transition">
              x
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
