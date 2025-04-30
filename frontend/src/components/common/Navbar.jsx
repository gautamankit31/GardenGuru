import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/logo.png";
import { close, more } from "../../assets/Images/index.js";
import { LuLogOut } from "react-icons/lu";
import { IoIosUnlock } from "react-icons/io";
import { logout } from "../../services/operations/AUTH_API.js";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => setToggle((prev) => !prev);

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <>
      <div className="w-full h-[80px] bg-white border-b border-gray-200 relative z-50">
        <div className="md:max-w-[1280px] max-w-[600px] m-auto w-full h-full flex justify-between items-center px-4 md:px-0">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-[40px]" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <NavLink to="/" end className="hover:text-[#20B486]">
              Home
            </NavLink>
            <NavLink to="/allplants" className="hover:text-[#20B486]">
              All Plants
            </NavLink>
            {token && (
              <>
                <NavLink to="/community" className="hover:text-[#20B486]">
                  Community
                </NavLink>
                <NavLink to="/dashboard" className="hover:text-[#20B486]">
                  Dashboard
                </NavLink>
                <NavLink to="/gemini" className="hover:text-[#20B486]">
                  Ask AI
                </NavLink>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <button
                onClick={() => dispatch(logout(navigate))}
                className="flex items-center gap-2 text-red-600 font-semibold  cursor-pointer"
              >
                <LuLogOut />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-gray-700 hover:text-black"
                >
                  <IoIosUnlock />
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 rounded-md bg-[#20B486] text-white font-semibold hover:opacity-90"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden z-50" onClick={handleToggle}>
            <img
              src={toggle ? close : more}
              alt="menu"
              className="w-6 h-6 cursor-pointer"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://icon-library.com/images/close-icon/close-icon-29.jpg";
              }}
            />
          </div>
        </div>

        {toggle && (
          <div className="absolute top-[80px] left-0 w-full bg-white z-40 px-8 py-4 shadow-md md:hidden">
            <ul className="flex flex-col gap-4 text-gray-700 font-medium">
              <NavLink
                to="/"
                end
                onClick={handleToggle}
                className="hover:text-[#20B486]"
              >
                Home
              </NavLink>
              <NavLink
                to="/allplants"
                onClick={handleToggle}
                className="hover:text-[#20B486]"
              >
                All Plants
              </NavLink>
              {token && (
                <>
                  <NavLink
                    to="/community"
                    onClick={handleToggle}
                    className="hover:text-[#20B486]"
                  >
                    Community
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    onClick={handleToggle}
                    className="hover:text-[#20B486]"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink to="/gemini"
                  onClick={handleToggle}
                  className="hover:text-[#20B486]">
                  Ask AI
                </NavLink>
                </>
              )}
              <div className="mt-6 flex flex-col gap-3">
                {token ? (
                  <button
                    onClick={() => {
                      dispatch(logout(navigate));
                      handleToggle();
                    }}
                    className="flex items-center gap-2 text-red-600  cursor-pointer"
                  >
                    <LuLogOut />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={handleToggle}
                      className="flex items-center gap-1"
                    >
                      <IoIosUnlock />
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={handleToggle}
                      className="inline-block px-3 py-1 rounded bg-[#20B486] text-white font-semibold w-fit"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
