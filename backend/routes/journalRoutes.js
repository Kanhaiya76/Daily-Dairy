const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");

const {
  validateJournalEntry,
  handleValidationErrors,
} = require("../middlewares/validationMiddleware");

const {
  addJournal,
  updateJournal,
  deleteJournal,
  getAllJournals,
  getOneJournal,
  getTodayJournal
} = require("../Controllers/journalController");

const { isAuthenticated } = require("../middlewares/authMiddleware");

router.post(
  "/add",
  isAuthenticated,
  upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  validateJournalEntry,
  handleValidationErrors,
  addJournal
);

router.put(
  "/update/:id",
  isAuthenticated,
  upload.fields([
    {
      name: "images",
      maxcount: 5,
    },
  ]),
  validateJournalEntry,
  handleValidationErrors,
  updateJournal
);

router.delete("/delete/:id", isAuthenticated, deleteJournal);

router.get("/alljournal", isAuthenticated, getAllJournals);

router.get("/today", isAuthenticated, getTodayJournal);

router.get("/:id", getOneJournal);


module.exports = router;
