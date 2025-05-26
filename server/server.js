const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(express.json());
app.use(cors(corsOptions));

const coverLetterRoute = require("./routes/coverLetter");
const applicationsRouter = require("./routes/applications");

app.use("/api/coverletter", coverLetterRoute);
app.use("/api/applications", applicationsRouter);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
