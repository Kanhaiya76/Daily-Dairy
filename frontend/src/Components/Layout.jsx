import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";

const Layout = () => {

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
