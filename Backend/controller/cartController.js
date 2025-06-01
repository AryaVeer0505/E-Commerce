import userModel from "../models/userModel.js"

export const addToCart=async(req,res)=>{
    try {
        const userId = req.user._id

        const {itemId,size}=req.body
        const userData=await userModel.findById(userId)

        let cartData=await userData.cartData || {}

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }
            else{
                cartData[itemId][size]=1 
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        await userModel.findByIdAndUpdate(userId,{cartData})

        res.json({
            success:true,
            message:"added to cart"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}
export const updateCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Cart updated",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserCart=async(req,res)=>{
    try {
          const userId = req.user._id; 
         const userData=await userModel.findById(userId)

        let cartData=await userData.cartData
        

         res.json({
            success:true,
            cartData
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Failled to fetch cart items"
        })
    }
}