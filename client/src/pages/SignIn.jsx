import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFaliure ,signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

function SignIn() {
    const [formData , setFormData ] = useState({});
    const {loading , error} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) =>
    {
       setFormData(
        {
          ...formData,
          [e.target.id] : e.target.value,
        }
       )
    }
    const handleSubmit = async (e) =>
    {
      e.preventDefault();
      try {
        dispatch(signInStart());
        const res = await fetch('api/auth/signin',
        {
          method:'POST',
          headers:
          {
            'Content-Type':'application/json',
          },
          body : JSON.stringify(formData),
        });
        const data = await res.json();
        if(data.success === false)
        {
          dispatch(signInFaliure(data.message));
         return;
        }
        dispatch(signInSuccess(data));
        navigate('/');
      } catch (error) {
       dispatch(signInFaliure(error.message));
  
      }
    };
    return (
      <div className='p-3 max-w-lg  mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input type="email" placeholder='email'
          className=' border p-3 rounded-lg' 
          id='email' onChange={handleChange}
          />
          <input type="password" placeholder='password'
          className=' border p-3 rounded-lg' 
          id='password' onChange={handleChange}
          />
          <input type="submit" value={loading ? 'Loading' : 'Sign Up'}disabled={loading}
          className=' bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-60'
          />
          <OAuth />
        </form>
        <div className='flex gap-2 mt-4'>
          <p>Dont hava an account?</p>
          <Link to={"/sign-up"}>
            <span className='text-green-600'>Sign up</span>
          </Link>
        </div>
        {error && <p className='text-red-500'>{error}</p>}
      </div>
    )
}

export default SignIn