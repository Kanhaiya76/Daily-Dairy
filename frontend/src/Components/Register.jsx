import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearMessage } from "../redux/slices/userSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.user);

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    const profilePicture = e.target.elements.profilePicture?.files[0];

    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePicture) formData.append("profilePicture", profilePicture);

    dispatch(registerUser(formData));

    setUsername("");
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
      navigate("/");
    }
  }, [dispatch, error, message]);

  return (
    <div>
      <div className="w-full flex flex-col relative">
        <nav className="w-full fixed z-10">
          <div className="w-full py-6 px-28 bg-[#fb392b] text-3xl text-white flex justify-between items-center font-normal mb-16">
            <div>
              <h1
                onClick={() => navigate("/")}
                className="hover:cursor-pointer"
              >
                Daily Diary
              </h1>
            </div>

            <div>
              <NavLink to="/login">Login</NavLink>
            </div>
          </div>
        </nav>

        <div className="flex flex-col mx-auto w-10/12 max-w-[840px] bg-white shadow-2xl shadow-black rounded-xl py-8 px-20 gap-10 mb-20 mt-40">
          <div className="flex flex-col gap-3 mb-12">
            <span className="text-center text-5xl text-black">
              Welcome to Daily Diary!
            </span>
            <span className="text-center text-5xl text-black">
              Let's create your account.
            </span>
          </div>

          <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              <input
                name="username"
                className="border border-black p-4 text-3xl rounded-lg opacity-60"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="text-xl tracking-widest" htmlFor="username">
                USERNAME
              </label>
            </div>

            <div className="flex flex-col gap-2">
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

            <div className="flex flex-col gap-2 relative">
              <input
                name="password"
                className="border border-black p-4 text-3xl rounded-lg opacity-60"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <EyeOff
                  size={30}
                  className="absolute right-4 top-9 -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <Eye
                  size={30}
                  className="absolute right-4 top-9 -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
              <label className="text-xl tracking-widest" htmlFor="password">
                PASSWORD
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <input
                name="profilePicture"
                accept="image/*"
                className="border border-black p-4 text-3xl rounded-lg opacity-60"
                type="file"
              />
              <label className="text-xl tracking-widest" htmlFor="password">
                PROFILE PICTURE
              </label>
            </div>

            <button
              type="submit"
              className="flex justify-center bg-blue-500 hover:bg-blue-700 py-6 px-12 text-2xl font-bold text-white rounded-lg hover:gap-2 transition-all duration-200 w-72"
            >
              Create Account
            </button>
          </form>

          <div className="flex gap-2 mx-auto text-xl opacity-70">
            <h1>Already have an account?</h1>
            <div className="underline hover:text-blue-500">
              <NavLink to="/login">Login Here</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
