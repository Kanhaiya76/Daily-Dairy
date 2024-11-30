const User = require("../models/userModel");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    // Handle file upload
    let profilePictureUrl = ""; // Default empty or fallback URL
    if (req.file) {
      try {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        profilePictureUrl = uploadResult?.url || "";
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          error: "Failed to upload profile picture",
        });
      }
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      profilePicture: profilePictureUrl,
    });

    // Respond with success
    if (user) {
      return res.status(201).json({
        success: true,
        message: "Registration successful",
        user,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Failed to create user",
      });
    }
  } catch (error) {
    next(error); // Pass error to middleware
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
    sameSite: "none",
  };

  if (user && (await user.comparePassword(password))) {
    res.cookie("token", token, options).json({
      success: true,
      message: "Login Successfull",
      user: user,
    })
  }
}


const getUser = async (req, res) => {
  const user = req.user;

  if (!req.user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user: user,
  });
};

const logoutUser = async (req, res) => {
  try {
    // Clear the cookie
    res.cookie("token", null, {
      expires: new Date(Date.now()), // Immediately expire the cookie
      httpOnly: true, // Ensure the cookie is HTTP-only for security
    });

    // Send a success response
    return res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    // Handle unexpected errors gracefully
    return res.status(500).json({
      success: false,
      error: "Failed to log out"
    });
  }
};
module.exports = { registerUser, loginUser, getUser, logoutUser };
