const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");

const {
  validateJournalEntry,
  handleValidationErrors,
} = require("../middlewares/validationMiddleware");

const {
  addJournal,
  updateJournalContent,
  updateJournalImages,
  deleteJournal,
  getAllJournals,
  getOneJournal
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
  "/update/content/:id",
  isAuthenticated,
  upload.none(),
  validateJournalEntry,
  handleValidationErrors,
  updateJournalContent
);

router.put(
  "/update/:id",
  isAuthenticated,
  upload.fields([
    {
      name: "images",
      maxcounts: 5,
    },
  ]),
  validateJournalEntry,
  handleValidationErrors,
  isAuthenticated,
  updateJournalImages
);

router.delete("/delete/:id", isAuthenticated, deleteJournal);

router.get("/alljournal", getAllJournals);

router.get("/:id", getOneJournal);

module.exports = router;
