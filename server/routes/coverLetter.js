const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.json({ message: "Cover Letter Route" });
});

router.post("/", upload.single("myFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("Uploaded file:", req.file.originalname);
  res.json({ message: "File received", filename: req.file.originalname });
});

module.exports = router;
