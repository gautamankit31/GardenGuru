import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
const Template = ({heading , subheading, image, specialText, page}) => {
  return (<>
    <div className="relative flex justify-center items-center">
    <img
      src={image[0]}
      alt="mage"
      className="absolute inset-0 max-h-[600px]  max-w-[400px] md:max-w-md blur-sm"
    />
    <img
      src={image[1]}
      alt="mage"
      className="relative z-10 w-[500px] max-h-[600px] max-w-[400px] md:max-w-md ml-14 py-[50px]"
    />
  </div>
  <div className="flex flex-col justify-center md:ml-[20px]">
    <h2 className="text-3xl font-semibold mb-5">Let's Get Started.</h2>
    {
        page === 'login' ? (<LoginForm></LoginForm>) : (<SignupForm></SignupForm>) 
    }
  </div>
  </>
  )
}

export default Template