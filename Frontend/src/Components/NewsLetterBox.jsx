import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler=(event)=>{
        event.preventDefault()
    }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe Now and get 20% off</p>
      <p className='text-gray-400 mt-3'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ex?</p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border'>
        <input type="email" placeholder='Enter your email' className='w-full flex-1 outline-0 pl-1' required/>
        <button type='submit' className='bg-black text-white texr-xs px-10 py-4'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
