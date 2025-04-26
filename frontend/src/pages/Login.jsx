import React from 'react'
import Template from '../components/core/Auth/Template'
import {login1,login2} from '../assets/Images/index.js'

const Login = () => {
  return (
    <div className="w-full min-h-screen md:bg-[#c4d7cf] py-16">
      <div className="bg-white md:max-w-[1280px] mx-auto grid md:gap-y-10 md:grid-cols-2 max-w-[600px] px-4 rounded-3xl shadow-xl">
        <Template
            image={[login1,login2]}
            page={"login"}
        ></Template>
      </div>
   </div>
  )
}

export default Login