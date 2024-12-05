const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }
  
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
    const user = await User.findById(decodedToken.id);
  
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Access Token",
      });
    }
  
    req.user = user;
    next();
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
};

module.exports = { isAuthenticated };
