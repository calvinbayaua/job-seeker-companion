const express = require("express");
const router = express.Router();
const multer = require("multer");
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("myFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const zip = new PizZip(req.file.buffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // 1. Parse all text from the document
    // 2. Define a regex filter to find all template fields
    // 3. Store fields in a set
    const text = doc.getFullText();
    const matches = [...text.matchAll(/\[\s*([^\[\]]+?)\s*\]/g)];
    const fields = [...new Set(matches.map((match) => match[1].trim()))];

    // Return unique template fields to frontend
    res.json({ fields });
  } catch (err) {
    console.error("Error parsing .docx:", err);
    res.status(500).json({ error: "Failed to parse .docx file" });
  }
});

router.post("/submit", upload.single("myFile"), (req, res) => {
  if (!req.body.fields) {
    return res.status(400).json({ error: "Input fields are missing" });
  }

  const zip = new PizZip(req.file.buffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: "[", end: "]" },
  });

  const parsedFields = JSON.parse(req.body.fields);
  doc.render(parsedFields);

  let rawXML = zip.file("word/document.xml").asText();

  // Replace any word ending in 's’'s' with just 's’'
  // Match pattern: any word ending in s or S, followed by RIGHT SINGLE QUOTE ’, then s
  // Replace with: word ending in s/S, followed by just the RIGHT SINGLE QUOTE
  rawXML = rawXML.replace(/(\b\w*[sS])’s\b/g, "$1’");

  // Replace the modified XML back in the zip
  zip.file("word/document.xml", rawXML);

  const buffer = zip.generate({ type: "nodebuffer" });

  res.set({
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "Content-Disposition": `attachment; filename="${parsedFields["Company Name"]} Cover Letter"`,
  });

  res.send(buffer);
});

module.exports = router;
