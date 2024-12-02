const Journal = require("../models/journalSchema");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const addJournal = async (req, res) => {
  const { content } = req.body;

  const userId = req.user._id;

  let images = [];

  if (
    req.files &&
    Array.isArray(req.files.images) &&
    req.files.images.length > 0
  ) {
    for (const image of req.files.images) {
      try {
        const result = await uploadOnCloudinary(image.path);
        images.push(result?.secure_url);
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload images",
          error: uploadError.message,
        });
      }
    }
  }

  try {
    const journal = await Journal.create({
      userId: userId,
      content: content,
      images: images,
    });
    res.status(200).json({
      success: true,
      message: "Journal added successfully",
      journal: journal,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateJournalContent = async (req, res) => {
  const { content } = req.body;
  const journalId = req.params.id;

  try {
    const journal = await Journal.findByIdAndUpdate(
      journalId,
      { content: content },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Journal updated successfully",
      journal: journal,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateJournalImages = async (req, res) => {
  const journalId = req.params.id;

  const { content } = req.body;

  const images = [];

  if (
    req.files &&
    Array.isArray(req.files.images) &&
    req.files.images.length > 0
  ) {
    for (const image of req.files.images) {
      try {
        const result = await uploadOnCloudinary(image.path);
        images.push(result.secure_url);
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload images",
          error: uploadError.message,
        });
      }
    }
  }

  try {
    const journal = await Journal.findByIdAndUpdate(
      journalId,
      { content: content, images: images },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Journal updated successfully",
      journal: journal,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteJournal = async (req, res) => {
  const journalId = req.params.id;

  try {
    const journal = await Journal.findByIdAndDelete(journalId);
    res.status(200).json({
      success: true,
      message: "Journal deleted successfully",
      journal: journal,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllJournals = async (req, res) => {
  const userId = req.user.id;

  try {
    const journals = await Journal.find({ userId: userId });
    res.status(200).json({
      success: true,
      message: "Journals fetched successfully",
      journals: journals,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOneJournal = async (req, res) => {
  const journalId = req.params.id;

  try {
    const journal = await Journal.findById(journalId);
    res.status(200).json({
      success: true,
      message: "Journal fetched successfully",
      journal: journal,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addJournal,
  updateJournalContent,
  updateJournalImages,
  getAllJournals,
  getOneJournal,
  deleteJournal
};
