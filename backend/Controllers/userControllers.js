const User = require("../models/userModel");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    let profilePictureLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.profilePicture) &&
      req.files.profilePicture.length > 0
    ) {
      profilePictureLocalPath = req.files.profilePicture[0].path;
    }

    const result = await uploadOnCloudinary(profilePictureLocalPath);

    const user = await User.create({
      username: username,
      email: email,
      password: password,
      profilePicture: result?.url || "",
    });

    if (user) {
      res.status(201).json({
        success: true,
        message: "Registeration successfull",
        user: user,
      });
    } else {
      res.status(400);
      throw new Error("Internal Server Error");
    }
  } catch (error) {
    next(error)
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(!user) {
    res.status(401);
    throw new Error("Invalid Email");
  }

  const token = user.generateJWT(user, res);

  const options = {
    httpOnly: true,
    secure: true,
  };

  if (user && (await user.comparePassword(password))) {
    res.cookie("token", token, options).json({
      success: true,
      message: "Login Successfull",
      user: user,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Password");
  }
};

getUser = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user: user,
  });
};

const logoutUser = async (req, res) => {
  try {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
    } catch (error) {
      throw new Error("Error logging out");
    }

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    throw new Error("");
  }
};
module.exports = { registerUser, loginUser, logoutUser };
