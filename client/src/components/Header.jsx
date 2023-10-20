import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

function Header() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <header className="bg-green-100">
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-green-500">Ghar</span>
            <span className="text-green-700">Jagga</span>
        </h1>
        </Link>
        <form className='bg-green-50 p-3 rounded-lg flex items-center '>
            <input type='text' placeholder='Search...'
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-green-500" />
        </form>
        <ul className='flex gap-5'>
            <Link to='/'>
            <li className='hidden sm:inline text-green-800 hover:underline'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline  text-green-800 hover:underline'>About</li>
            </Link>
            <Link to='/profile'>
            {currentUser ?
            (
             <img src={currentUser.avatar} alt='profile' 
             className='rounded-full h-7 w-7 object-cover '
             />
            ):
            (
              <li className='text-green-800 hover:underline'>Sign in</li>
            )
            }
  
           
            </Link>
        </ul>
        </div>
    </header>
  )
}

export default Header