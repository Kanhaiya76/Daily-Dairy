import React from "react";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="w-full flex flex-col relative">
        
        {/* navbar */}
        <nav className="w-full fixed z-10">
          <div className="w-full py-10 px-28 bg-[#fb392b] text-3xl text-white flex justify-between items-center font-normal mb-28">
            <div>
              <h1>Memoir</h1>
            </div>

            <div className="flex gap-12 items-center">
              <div>
                <NavLink to="/login">Login</NavLink>
              </div>
              <div className="flex items-center gap-0 hover:gap-2 transition-all duration-200 w-40">
                <NavLink to="/register">Register</NavLink>
                <ArrowRight size={35} />
              </div>
            </div>
          </div>
        </nav>

        {/* hero section */}
        <section className="flex justify-center mb-24 mt-60">
          <div className="flex flex-col justify-around gap-y-8 gap-x-4 min-h-[600px] items-center w-[90%] 2xl:flex-row">
            <div className="flex flex-col gap-12 justify-center items-center 2xl:items-start hover:scale-105 transition-all duration-500">
              <h1 className="text-8xl text-center 2xl:text-left">
                Your own Private <br /> Journal.
              </h1>
              <div className="flex justify-center bg-blue-500 hover:bg-blue-700 py-6 px-12 text-2xl font-bold text-white rounded-lg gap-0 hover:gap-2 transition-all duration-200 w-72 group hover:cursor-pointer">
                <NavLink to="/register">Register</NavLink>
                <ArrowRight size={35} className="text-blue-300" />
              </div>
            </div>
            <div>
              <img
                src="https://penzu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-image-03.9070c3b3.jpg&w=1080&q=75"
                alt="Home-Image"
                className="w-[800px] h-[600px] shadow-2xl shadow-black hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
