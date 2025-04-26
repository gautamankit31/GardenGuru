import React from 'react'
import {signup1,signup2} from '../assets/Images/index.js'
import Template from '../components/core/Auth/Template'
const Signup = () => {
  return (
    <div className='w-full min-h-screen md:bg-[#c4d7cf] py-16 flex justify-center items-center'>
      <div className='bg-white md:w-[1280px] px-6 py-8 rounded-3xl shadow-xl'>
        <div className="grid md:grid-cols-2 ">
        <Template
            image={[signup1,signup2]}
            page={"signup"}
        ></Template>
    </div>
    </div>
    </div>
  )
}

export default Signup