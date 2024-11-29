
const express = require('express');
const router = express.Router();
const { validateUserRegistration, validateUserLogin, handleValidationErrors } = require("../middlewares/validationMiddleware")
const upload = require("../middlewares/multerMiddleware")
const { isAuthenticated } = require("../middlewares/authMiddleware");



const { registerUser, loginUser, getUser, logoutUser } = require('../Controllers/userControllers');



router.post('/register', upload.fields([
    {
      name: "profilePicture",
      maxcounts: 1,
    }
  ]), validateUserRegistration, handleValidationErrors, registerUser);
  
router.post('/login', upload.none(), validateUserLogin, handleValidationErrors, loginUser);

router.get('/getuser', isAuthenticated, getUser);

router.get('/logout', logoutUser);

module.exports = router;