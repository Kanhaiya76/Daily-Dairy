import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearMessage } from "../redux/slices/userSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Login = () => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, error, isAuthenticated} = useSelector((state) => state.user);

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser({ email, password }));

    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      navigate("/journal");
    }
  }, [dispatch, error, message]);


  return (
    <div className="w-full">
      <nav>
        <div className="w-full py-6 px-28 bg-[#fb392b] text-3xl text-white flex justify-between items-center font-normal mb-16">
          <div>
            <h1 onClick={() => navigate("/")} className="hover:cursor-pointer">
              Memoir
            </h1>
          </div>

          <div>
            <NavLink to="/register">Register</NavLink>
          </div>
        </div>
      </nav>

      <div className="flex flex-col mx-auto w-10/12 max-w-[840px] bg-white shadow-2xl shadow-black rounded-xl gap-10 mb-20">
        <div className="flex justify-center text-3xl p-5 opacity-70 bg-slate-100 rounded-t-xl">
          <h1>Log In</h1>
        </div>

        <div className="flex flex-col mx-20 gap-10">
          <div className="flex flex-col gap-2 w-full">
            <input
              name="email"
              className="border border-black p-4 text-3xl rounded-lg opacity-60"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-xl tracking-widest" htmlFor="email">
              EMAIL ADDRESS
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <input
              name="password"
              className="border border-black p-4 text-3xl rounded-lg opacity-60"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="text-xl tracking-widest" htmlFor="password">
              PASSWORD
            </label>
          </div>

          <button
            onClick={onSubmit}
            className="flex justify-center bg-blue-500 hover:bg-blue-700 py-6 px-12 text-2xl font-bold text-white rounded-lg hover:gap-2 transition-all duration-200 w-72"
          >
            Login
          </button>

          <div className="flex gap-2 mx-auto text-xl opacity-70 mb-10">
            <h1>Don't have an account?</h1>
            <div className="underline hover:text-blue-500">
              <NavLink to="/register">Register Here</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login