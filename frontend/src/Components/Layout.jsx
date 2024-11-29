import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "../redux/slices/userSlice";

const Layout = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  const { isAuthenticated } = useSelector(
    (state) => state.user
  );

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <div className="w-full flex flex-col relative">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
