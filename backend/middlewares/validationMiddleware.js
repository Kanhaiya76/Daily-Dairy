const { check, validationResult } = require("express-validator");

// Validation rules for user registration
const validateUserRegistration = [
  check("username").notEmpty().withMessage("Username is required"),
  check("email").isEmail().withMessage("Enter a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateUserLogin = [
  check("email").isEmail().withMessage("Enter a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateJournalEntry = [
  check("content").notEmpty().withMessage("Journal entry can't be empty"),
];



// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateUserRegistration, validateUserLogin, validateJournalEntry, handleValidationErrors };
