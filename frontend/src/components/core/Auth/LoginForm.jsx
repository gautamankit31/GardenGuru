import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../../services/operations/AUTH_API';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
    })
    const { email, password } = formData;

    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(login(formData.email, formData.password, navigate))
    }
    const changeHandler = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }
    return (
       <>
       <form onSubmit={onSubmitHandler}>
       <div>
            <input type="email" name="email" id="email" onChange={changeHandler} 
                      className="bg-white border max-w-[500px] p-4 input-box-shadow rounded-md w-full my-2 border-gray-300"
                      placeholder='Enter email address'
                      value={email}
                  />
              </div>

            <div className='relative'>
               <input type="password" name="password" id="password" onChange={changeHandler} 
                     className="w-full bg-white border max-w-[500px] p-4 input-box-shadow rounded-md my-2 border-gray-300 block"
                     placeholder='Enter Password'
                     value={password}
                 />
                 <Link to="/forgot-password">
                     <span className='mt-1 ml-1 max-w-max text-xs text-green-600'>Forgot Password?</span>
                 </Link>
                 
             </div>
             
             <button type="submit" className="btn-login bg-[#20b486] text-white rounded hover:bg-[#20b43c] px-4 py-2 mt-4 transition-colors duration-300 max-w-[500px] w-full">Login</button>
        </form>
        </>
    )
}

export default LoginForm 