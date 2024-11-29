import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function Logout() {
    dispatch(logoutUser());
    navigate("/")
  }

  return (
    <>
      <nav className="w-full fixed z-10">
        <div className="w-full py-6 bg-[#fb392b] text-3xl text-white items-center font-normal mb-16">
          <div className="flex justify-between px-6 text-4xl">
            <div>
              <h1>Memoir</h1>
            </div>

            <div className="flex gap-8">
              <div className="flex gap-2">
                <div>
                  {user.profilePicture == "" ? (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <img
                      src={user.profilePicture}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                </div>
                <div>
                  <p>{user.username}</p>
                </div>
              </div>
              <div>
                <h1 onClick={Logout} className="hover:cursor-pointer">
                  Logout
                </h1>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
