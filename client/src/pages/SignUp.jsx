import React from 'react'
import {Link} from 'react-router-dom'

function SignUp() {
  return (
    <div className='p-3 max-w-lg  mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form action="" className='flex flex-col gap-4'>
        <input type="text" placeholder='username'
        className=' border p-3 rounded-lg' 
        id='username'
        />
        <input type="email" placeholder='email'
        className=' border p-3 rounded-lg' 
        id='email'
        />
        <input type="password" placeholder='password'
        className=' border p-3 rounded-lg' 
        id='password'
        />
        <input type="button" value="Sign up" 
        className=' bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-60'
        />
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-green-600'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp