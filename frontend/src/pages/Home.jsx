import React from 'react'
import { NavLink } from "react-router-dom";
import { p1, p2, p3, p4, p5, p10, p16, p17, p18 } from "../assets/Images/index.js";


function Home() {
  return (
    <>
      <div className="w-full bg-white py-24 ">
        <div className="md:max-w-[1280px] m-auto grid gap-y-450px md:grid-cols-2 max-w-[600px]  px-4 md:px-0">
          <div className="flex flex-col justify-space-between gap-4">
            <p className="py-2 text-2xl text-[#20B486] font-medium">
              GREENIFY YOUR LIFE
            </p>
            <h1 className="md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold">
              Cultivate <span className="text-[#20B486]">Dreams.</span>
              <br />
              Thrive with <span className="text-[#20B486]">Nature.</span>
              <br />
              Blossom Your <span className="text-[#20B486]">Garden.</span>
            </h1>
            <p className="py-2 text-lg text-gray-600">
              Let us guide you through every step of your gardening journey,
              from planting the first seed to reaping a harvest of success.
            </p>

            <button className="bg-[#20B486] border max-w-[170px] p-4 shadow-2xl rounded-md  text-white text-2xl hover:bg-[#20b43c] transition-colors duration-300">
              <NavLink to="/login">Get Started</NavLink>
            </button>
          </div>
          <img
            src={p3}
            alt="img"
            className="md:order-last order-first h-[500px] md:h-[600px] md:ml-[150px]"
          />
        </div>
      </div>
      <div className="w-full bg-[#f9f5f1] py-2 ">
        <div className=" md:max-w-[1280px] m-auto grid gap-y-450px md:grid-cols-2 max-w-[600px] px-4 md:px-0">
          <div className="flex flex-col justify-center gap-4">
            <div className="bg-white text-center rounded-3xl shadow p-4 inline-block ">
              <h1 className="md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold">
                Discover Botanical Wonders!
              </h1>
              <p className="py-2 text-lg text-gray-600">
                Embark on a botanical adventure with our extensive database.
                Explore a diverse collection of plants, from rare orchids to
                resilient succulents. Whether you're seeking gardening
                inspiration or in-depth plant care guides, you'll find
                everything you need to cultivate your green paradise right here.
              </p>
            </div>
          </div>
          <img
            src={p16}
            alt="img"
            className="order-last md:order-first h-[500px] md:h-[600px]"
          />
        </div>
      </div>
      <div className="w-full bg-[#f9f5f1] py-2 ">
        <div className="md:max-w-[1280px] m-auto grid gap-y-450px md:grid-cols-2 max-w-[600px] px-4 md:px-0">
          <div className="flex flex-col justify-center gap-4">
            <div className="bg-white text-center rounded-3xl shadow p-4 inline-block ">
              <h1 className="md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold">
                Protect Your Plants!
              </h1>
              <p className="py-2 text-lg text-gray-600">
                Empower yourself with our advanced plant disease recognition
                tool. Quickly identify and combat diseases, pests, and other
                threats to keep your garden thriving. With intuitive features
                and expert insights, you'll be equipped to safeguard your plants
                and ensure they reach their full potential.
              </p>
            </div>
          </div>
          <img
            src={p17}
            alt="img"
            className="order-last h-[500px] md:h-[600px]"
          />
        </div>
      </div>
      <div className="w-full bg-[#f9f5f1] py-2 ">
        <div className="md:max-w-[1280px] m-auto grid gap-y-450px md:grid-cols-2 max-w-[600px] px-4 md:px-0">
          <div className="flex flex-col justify-center gap-4">
            <div className="bg-white text-center rounded-3xl shadow p-4 inline-block ">
              <h1 className="md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold">
                Grow Together!
              </h1>
              <p className="py-2 text-lg text-gray-600">
                Join a vibrant global community of plant enthusiasts! Share your
                gardening triumphs, seek advice, and connect with fellow green
                thumbs. Whether you're a seasoned gardener or just starting your
                journey, our community provides a supportive environment where
                you can learn, share, and flourish together.
              </p>
            </div>
          </div>
          <img
            src={p18}
            alt="img"
            className="order-last md:order-first h-[500px] md:h-[600px] "
          />
        </div>
      </div>
      <div className="w-full bg-[#E9F8F3B2] py-2">
        <div className="md:max-w-[1480px] m-auto max-w-[600px] py-10 px-4 md:px-0">
          <h1 className="text-center text-2xl font-bold text-[#536E96]">
            Trusted by over 25,000 Peoples around the world.
          </h1>
          <p className="text-center  text-[#536E96] text-xl">
            Join a Thriving Community of Plant Enthusiasts Who Rely on Our Rich
            Library to Care for Their Green Buddies!
          </p>
          <div className="flex justify-center py-8 md:gap-8 ">
            <div className="grid md:grid-cols-5 grid-cols-2 gap-2">
              <img src={p1} alt="img" className="hidden md:block" />
              <img src={p2} alt="img" className="hidden md:block" />
              <img src={p4} alt="img" />
              <img src={p5} alt="img" className="hidden md:block" />
              <img src={p10} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home