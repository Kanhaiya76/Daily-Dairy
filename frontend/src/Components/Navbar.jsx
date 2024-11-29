import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

const Navbar = () => {

  const { user } = useSelector(
    (state) => state.user
  );

  return (
    <>
      <nav className="w-full fixed z-10">
        <div className="w-full py-6 bg-[#fb392b] text-3xl text-white items-center font-normal mb-16">
          <div className="flex justify-between px-6">
            <div>
              <h1>Memoir</h1>
            </div>

            <div>
              <div>
                <div className="">
                  if ({user.profilePicture} != ""){" "}
                  {<img src="user.profilePicture" alt="" />} else{" "}
                  {
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                      alt=""
                    />
                  }
                </div>
                <div>
                  <p>{user.username}</p>
                </div>
              </div>
              <div>
                <h1>Logout</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar