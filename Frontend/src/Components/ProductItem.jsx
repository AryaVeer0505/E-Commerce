import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router'
import { products } from '../assets/frontend_assets/assets'

const ProductItem = ({id,image,name,price}) => {
    const {currency} =useContext(ShopContext)
  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer '>
        <div className='overflow-hidden'>
            <img src={image[0]} alt="" className='hover:scale-110 transition ease-in-out'/>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>

        </div>
    
    </Link>
  )
}

export default ProductItem
