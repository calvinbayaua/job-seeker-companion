const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  companyName: String,
  jobTitle: String,
  location: String,
  date: Date,
});

module.exports = mongoose.model("Application", applicationSchema);
