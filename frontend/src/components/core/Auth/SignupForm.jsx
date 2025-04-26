import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOTP, signup } from '../../../services/operations/AUTH_API';
import { setSignupData } from '../../../slices/authSlice';
import toast from 'react-hot-toast';

const SignupForm = () => {
    const [ accountType, setAccountType ] = useState('User');
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        pincode:""
    })
    const { firstName, lastName, email, password, confirmPassword,pincode} = formData;

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        
        if(password != confirmPassword) {
            toast.error("Passwords Do Not Match");
            return;
        }

        const signUpData = {
            ...formData, 
            accountType: accountType,
        }


        dispatch(setSignupData(signUpData));
        dispatch(sendOTP(email, navigate));

        //RESET
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            pincode:""
          })
          setAccountType('User');
    }
    const changeHandler = (event) => {
        setFormData((prev) => ({
            ...prev, 
            [event.target.name]: event.target.value,
        }))
    }
  return (
    <div>
      <div className="flex bg-green-100 p-1 gap-x-1 rounded-full max-w-max">
        <button
          className={`${
            accountType == "User" ? "bg-green-900" : "bg-transparent"
          } text-richblack-200 py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType("User")}
        >
          User
        </button>
        <button
          className={` ${
            accountType == "Admin" ? "bg-green-900" : "bg-transparent"
          }  bg-green-900 text-richblack-5 py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType("Admin")}
        >
          Admin
        </button>
      </div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Enter First Name"
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={changeHandler}
          className="bg-white border max-w-[500px] p-4 input-box-shadow rounded-md w-full my-2 border-gray-300"
        />
        <input
          type="text"
          placeholder="Enter Your Lastname"
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={changeHandler}
          className="bg-white border max-w-[500px] p-4 input-box-shadow rounded-md w-full my-2 border-gray-300"/>
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          id="email"
          value={email}
          onChange={changeHandler}
          className="bg-white border max-w-[500px] p-4 input-box-shadow rounded-md w-full my-2 border-gray-300"        />
        <input
          type="pincode"
          placeholder="Enter Pincode"
          name="pincode"
          id="pincode"
          value={pincode}
          onChange={changeHandler}
          className="bg-white border max-w-[500px] p-4 input-box-shadow rounded-md mb-4"
        />
        <div className="flex flex-wrap gap-4 mb-4">
        <div className='w-[50%] relative'>
                    <label htmlFor="password" className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Create Password <sup className='text-pink-200'>*</sup></label>
                    <input 
                        type={`${showPassword ? "text" : "password"}`} name="password" id="password" onChange={changeHandler} 
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-richblack-600 border-b-2'
                        placeholder='Enter Password'
                        value={password}
                    />
                    <span 
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                        {showPassword ? <AiOutlineEyeInvisible  fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                    </span>
                </div>
                <div className=' w-[50%] relative'>
                    <label htmlFor="confirmPassword" className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Confirm Password <sup className='text-pink-200'>*</sup></label>
                    <input 
                        type={`${showConfirmPassword ? "text" : "password"}`} name="confirmPassword" id="confirmPassword" 
                        onChange={changeHandler} className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-richblack-600 border-b-2'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                    />
                    <span 
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                        {showConfirmPassword ? <AiOutlineEyeInvisible  fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                    </span>
                </div>
        </div>
        <button
          type="submit"
          className="btn-login bg-[#20b486] text-white rounded hover:bg-[#20b43c] px-4 py-2 transition-colors duration-300 max-w-[500px]">Create Account</button>
      </form>
    </div>
  );
}

export default SignupForm