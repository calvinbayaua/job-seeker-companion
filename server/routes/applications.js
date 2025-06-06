const express = require("express");
const router = express.Router();
const Application = require("../models/application.js");

router.get("/", async (req, res) => {
  try {
    const apps = await Application.find();
    return res.json(apps);
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve applications" });
  }
});

router.post("/submit", async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    await newApplication.save();
    return res.status(200).json({ message: "Applicaton added successfully!" });
  } catch (error) {
    console.error("Error adding new application to database:", error);
    return res.status(500).json({ message: "Failed to add new applicaton." });
  }
});

module.exports = router;
