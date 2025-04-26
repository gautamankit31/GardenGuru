import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOTP } from '../../../services/operations/AUTH_API';
import { setSignupData } from '../../../slices/authSlice';
import toast from 'react-hot-toast';

const SignupForm = () => {
  const [accountType, setAccountType] = useState('User');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    pincode: ""
  });

  const { firstName, lastName, email, password, confirmPassword, pincode } = formData;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const signUpData = {
      ...formData,
      accountType: accountType,
    };

    dispatch(setSignupData(signUpData));
    dispatch(sendOTP(email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      pincode: ""
    });
    setAccountType('User');
  };

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="flex">
      <div className="flex flex-col">
        <div className="flex bg-green-100 p-1 rounded-full mb-6 w-fit">
          <button
            className={`${
              accountType === "User" ? "bg-green-900 text-white" : "bg-transparent"
            } py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType("User")}
          >
            User
          </button>
          <button
            className={`${
              accountType === "Admin" ? "bg-green-900 text-white" : "bg-transparent"
            } py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType("Admin")}
          >
            Admin
          </button>
        </div>

        <form onSubmit={onSubmitHandler} className="w-full max-w-[600px]">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={changeHandler}
              className="bg-white border p-4 rounded-md w-full border-gray-300"
            />
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={changeHandler}
              className="bg-white border p-4 rounded-md w-full border-gray-300"
            />
          </div>

          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            id="email"
            value={email}
            onChange={changeHandler}
            className="bg-white border p-4 rounded-md w-full mt-4 border-gray-300"
          />

          <input
            type="text"
            placeholder="Enter Pincode"
            name="pincode"
            id="pincode"
            value={pincode}
            onChange={changeHandler}
            className="bg-white border p-4 rounded-md w-full mt-4 border-gray-300"
          />
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={changeHandler}
                value={password}
                placeholder="Enter Password"
                className="bg-white border p-4 rounded-md w-full border-gray-300"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-4 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} />
                ) : (
                  <AiOutlineEye fontSize={24} />
                )}
              </span>
            </div>

            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                onChange={changeHandler}
                value={confirmPassword}
                placeholder="Confirm Password"
                className="bg-white border p-4 rounded-md w-full border-gray-300"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-4 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} />
                ) : (
                  <AiOutlineEye fontSize={24} />
                )}
              </span>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#20b486] text-white rounded hover:bg-[#20b43c] px-6 py-3 transition-colors duration-300"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
