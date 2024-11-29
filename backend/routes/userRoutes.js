
const express = require('express');
const router = express.Router();
const { validateUserRegistration, validateUserLogin, handleValidationErrors } = require("../middlewares/validationMiddleware")
const upload = require("../middlewares/multerMiddleware")
const { isAuthenticated } = require("../middlewares/authMiddleware");



const { registerUser, loginUser, logoutUser } = require('../Controllers/userControllers');



router.post('/register', upload.fields([
    {
      name: "profilePicture",
      maxcounts: 1,
    }
  ]), validateUserRegistration, handleValidationErrors, registerUser);
  
router.post('/login', validateUserLogin, handleValidationErrors, loginUser);

router.get('/logout', logoutUser);

module.exports = router;