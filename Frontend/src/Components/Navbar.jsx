import React,{useContext, useState} from 'react'
import {assets} from '../assets/frontend_assets/assets'
import {Link, NavLink } from 'react-router'
import { ShopContext } from '../Context/ShopContext'
const Navbar = () => {
  const [visible,setVisible]=useState(false)
  const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext)
  const logout=()=>{
         navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
       
  }
  return (
    <div className='flex justify-between items-center py-5 font-medium'>
    <Link to='/'> <img src={assets.logo} alt="" className='cursor-pointer'/></Link>
     <ul className='hidden sm:flex gap-10 text-md text-gray-700'>
      <NavLink to='/' className="flex flex-col items-center gap-1">
        <p>Home</p>
        <hr className='w-2/4 border-0 h-[1.5px] bg-gray-700 hidden'/>
      </NavLink>
      <NavLink to='/collection' className="flex flex-col items-center gap-1">
        <p>Collection</p>
        <hr className='w-2/4 border-0 h-[1.5px] bg-gray-700 hidden'/>
      </NavLink>
      <NavLink to='/about' className="flex flex-col items-center gap-1">
        <p>About</p>
        <hr className='w-2/4 border-0 h-[1.5px] bg-gray-700 hidden'/>
      </NavLink>
      <NavLink to='/contact' className="flex flex-col items-center gap-1">
        <p>Contact</p>
        <hr className='w-2/4 border-0 h-[1.5px] bg-gray-700 hidden'/>
      </NavLink>
     </ul>
     <div className='flex items-center gap-7'>
         <img src={assets.search_icon} alt="search" className='w-5 cursor-pointer' onClick={()=>setShowSearch(true)}/>
         <div className='group relative'>
          <img onClick={()=>token ? null : navigate('/login')} src={assets.profile_icon} alt="" className='w-5 cursor-pointer'/>
          {
            token &&
            <div  className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-3 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Log Out</p>
            </div>
             </div>
          }
          
         
         </div>
         <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} alt="" className='w-5 min-w-5'/>
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[12px]'>{getCartCount()}</p>
         </Link>
         <img onClick={()=>setVisible(true)} src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden'/>
     </div>

     {/* Sidebar menu for small screen  */}
     <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${visible?'w-full':'w-0'}`}>
      <div className='flex flex-col text-gray-600'>
        <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img  src={assets.dropdown_icon} alt="" className='h-4 rotate-180'/>
            <p>Back</p>
        </div>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-b' to='/'>Home</NavLink>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-b' to='/collection'>Collection</NavLink>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-b' to='/about'>About</NavLink>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-b' to='/contact'>Contact</NavLink>
      </div>
     </div>
    </div>
  )
}

export default Navbar
