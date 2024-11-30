import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function Logout() {
    dispatch(logoutUser());
    navigate("/");
  }

  return (
    <>
      <nav className="w-full fixed z-10">
        <div className="w-full py-3 bg-[#fb392b] text-2xl text-white items-center font-normal mb-16">
          <div className="flex justify-between px-6 text-4xl items-center">
            <div>
              <h1
                onClick={() => {
                  navigate("/journal");
                }}
                className="hover:cursor-pointer font-mono"
              >
                Memoir
              </h1>
            </div>

            <div className="flex gap-8 items-center">
              <div className="flex gap-2 items-center">
                <div>
                  {user.profilePicture == "" ? (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                      alt=""
                      className="w-14 h-1 rounded-full"
                    />
                  ) : (
                    <img
                      src={user.profilePicture}
                      alt=""
                      className="w-14 h-14 rounded-full"
                    />
                  )}
                </div>
                <div>
                  <p className="font-mono">{user.username}</p>
                </div>
              </div>
              <div>
                <h1 onClick={Logout} className="hover:cursor-pointer font-mono">
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
