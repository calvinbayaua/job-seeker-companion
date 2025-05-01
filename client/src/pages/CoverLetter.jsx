import axios from "axios";
import React, { useState } from "react";
import Header from "../components/Header";

export default function CoverLetter() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fields, setFields] = useState({});

  // Set selectedFile to new selected file
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Send POST request to backend when Upload button is pressed
  // Initialize fields keys from backend response
  const onUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/coverletter/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // * Consider changing fields directly
      const initialFields = {};
      response.data.fields.forEach((field) => {
        initialFields[field] = "";
      });
      setFields(initialFields);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Send POST request to backend when Submit button is pressed
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("myFile", selectedFile);
    formData.append("fields", JSON.stringify(fields));

    try {
      const response = await axios.post(
        "http://localhost:8080/api/coverletter/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      // Create a download link and click it
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "filled_cover_letter.pdf"); // Set file name
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
    console.log("Submitted fields:", fields);
  };

  // Initialize form with the extracted fields from the backend response
  const fieldForms = (
    <form onSubmit={handleSubmit}>
      {Object.keys(fields).map((field) => {
        return (
          <div key={field}>
            <label htmlFor={field}>{field}: </label>
            <input
              id={field}
              name={field}
              type="text"
              onChange={
                (e) =>
                  setFields((prev) => ({ ...prev, [field]: e.target.value })) // Sets fields at every keystroke
              }
            />
          </div>
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );

  const fileData = selectedFile ? null : (
    <div>
      <br />
      <h4>Choose before Pressing the Upload button</h4>
    </div>
  );

  return (
    <div>
      <Header />
      <h1>Cover Letter Tools</h1>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onUpload}>Upload!</button>
      </div>
      {fileData}
      {Object.keys(fields).length > 0 && fieldForms}
    </div>
  );
}
