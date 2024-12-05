
const express = require('express');
const router = express.Router();
const { validateUserRegistration, validateUserLogin, handleValidationErrors } = require("../middlewares/validationMiddleware")
const upload = require("../middlewares/multerMiddleware")
const { isAuthenticated } = require("../middlewares/authMiddleware");

const { registerUser, loginUser, getUser, logoutUser } = require('../Controllers/userControllers');

router.post(
  "/register",
  upload.single("profilePicture"),
  validateUserRegistration,
  handleValidationErrors,
  registerUser
);
  
router.post('/login', upload.none(), validateUserLogin, handleValidationErrors, loginUser);

router.get('/getuser', isAuthenticated, getUser);

router.get('/logout', logoutUser);

module.exports = router;