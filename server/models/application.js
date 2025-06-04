const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  companyName: String,
  jobTitle: String,
  jobType: String,
  location: String,
  locationType: String,
  date: Date,
  link: String,
  easyApply: String,
  coverLetterSent: String,
  status: String,
});

module.exports = mongoose.model("Application", applicationSchema);
