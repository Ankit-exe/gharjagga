import React from 'react'
import { useSelector } from 'react-redux'
function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <div>
      <h1 className=' text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className=' flex flex-col gap-4 '>
        <img src={currentUser.avatar} alt='profile'
        className='self-center  rounded-full h-24 w-24 object-cover cursor-pointer'
        />
        <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg' />
        <input type="text" placeholder='email' id='email' className='border p-3 rounded-lg' />
        <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg' />
        <input type='button' value='update' className='uppercase bg-green-700 text-white rounded-lg p-3  hover:opacity-80' />
      </form> 
      <div className='flex justify-between mt-5'> 
        <span className='text-red-700  cursor-pointer hover:text-red-600'>Delete Account</span>
        <span className='text-red-700  cursor-pointer hover:text-red-600' >Sign Out</span>
      </div>
    </div>
    </div>
  )
}

export default Profile