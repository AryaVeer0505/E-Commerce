import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router'

const Searchbar = () => {
    const {search,setSearch,showSearch,setShowSearch}=useContext(ShopContext)
    const location=useLocation()
    const [visible,setVisible]=useState(false)
    useEffect(()=>{
      if(location.pathname.includes("collection")){
          setVisible(true)
      }
      else{
        setVisible(false)
      }
    },[location])
  return showSearch && visible?   (
    <div className='border-t border-b bg-gray-50 text-center'>
       <div className='inline-flex items-center justify-center border border-gray-400 px-5 p-2 rounded-full my-5 mx-3 w-3/4 sm:w-1/2'>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-0 bg-inherit text-sm '/>
          <img src={assets.search_icon} alt="" className='w-4'/>
       </div>
       <img src={assets.cross_icon} alt="" className='inline w-3 cursor-pointer' onClick={()=>setShowSearch(false)}/>
    </div>
  ):null
}

export default Searchbar
