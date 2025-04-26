import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import logo from "../../assets/Logo/logo.png"
import { Link,NavLink} from 'react-router-dom';
import {close,more} from "../../assets/Images/index.js"
import { LuLogOut } from "react-icons/lu";
import { IoIosUnlock } from "react-icons/io";

function Navbar() {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [toggle,setToggle]=useState(false);
    const handleClick = () => setToggle(!toggle);
  return (
    <>
    <div className="w-full h-[80px] bg-white border-b">
    <div className="md:max-w-[1280px] max-w-[600px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
        <Link to="/">
        <img src={logo} className='h-[40px]'/>
        </Link>
    </div>
    <div className="hidden md:flex items-center ">
              <ul className="flex gap-10">
                <NavLink to="/" className="active" end>
                  Home
                </NavLink>
                <NavLink to="/allplants" className="active">
                 All Plants
                </NavLink>
                {
                token ? (<>
                  <li className="p-4 hover:bg-gray-100">
                    <NavLink to="/community" className="active">
                      Community
                    </NavLink>
                  </li>
                  <li className="p-4 hover:bg-gray-100">
                    <NavLink to="/dashboard" className="active">
                      Dashboard
                    </NavLink>
                  </li>
                  </>
                ):(<></>)
              }
              </ul>
            </div>
            <div className="hidden md:flex">
              <button className="flex justify-between items-center  bg-transparent  px-6 gap-2">
                <IoIosUnlock />
                <Link to="/login">SignIn</Link>
              </button>
              <button className="px-8 py-3 rounded-md bg-[#20B486] text-white font-bold">
                <Link to="/signup">Sign Up for Free</Link>
              </button>
            </div>
            <div className="md:hidden" onClick={handleClick}>
              <img alt="" src={toggle ? close : more} />
            </div>
          </div>
          <div
            className={
              toggle
                ? "absolute z-10 p-4  bg-white w-full px-8 md:hidden border-b"
                : "hidden"
            }
          >
            <ul>
              <li className="p-4 hover:bg-gray-100">
                <NavLink to="/" className="active" end>
                  Home
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-100">
                <NavLink to="/allplants" className="active">
                 All Plants
                </NavLink>
              </li>
              {
                token ? (<>
                  <li className="p-4 hover:bg-gray-100">
                    <NavLink to="/community" className="active">
                      Community
                    </NavLink>
                  </li>
                  <li className="p-4 hover:bg-gray-100">
                    <NavLink to="/dashboard" className="active">
                      Dashboard
                    </NavLink>
                  </li>
                  </>
                ):(<></>)
              }
              <div className="flex flex-col my-4 gap-4">
                <button className="border border-[20B486] flex justify-center items-center  bg-transparent  px-6 gap-2 py-4">
                  <IoIosUnlock />
                  <NavLink to="/login">SignIn</NavLink>
                </button>
                <button className="px-8 py-5 rounded-md bg-[#20B486] text-white font-bold">
                  <NavLink to="/signup">Sign Up for Free</NavLink>
                </button>
              </div>
            </ul>
    </div>
    </>
  )
}

export default Navbar