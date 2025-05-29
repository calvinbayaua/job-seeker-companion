const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};
require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on("error", (err) => console.error("Connection error: ", err));
db.once("open", () => console.log("Connected to MongoDB"));

const coverLetterRoute = require("./routes/coverLetter");
const applicationsRouter = require("./routes/applications");

app.use("/api/coverletter", coverLetterRoute);
app.use("/api/applications", applicationsRouter);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
