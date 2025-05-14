const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(express.json());
app.use(cors(corsOptions));

const coverLetterRoute = require("./routes/coverLetter");

app.use("/api/coverletter", coverLetterRoute);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
