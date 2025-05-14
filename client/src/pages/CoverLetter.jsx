import axios from "axios";
import React, { useState } from "react";
import Header from "../components/Header";

export default function CoverLetter() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fields, setFields] = useState({});
  const [downloadUrl, setDownloadUrl] = useState(null);

  // Set selectedFile to new selected file
  const onFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (!file) return;

    const formData = new FormData();
    formData.append("myFile", file, file.name);

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

    } catch (err) {
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

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  // Initialize form with the extracted fields from the backend response
  const fieldForms = (
    <form className="cl-form" onSubmit={handleSubmit}>
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

  const downloadCoverLetter = () => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${fields["Company Name"]} Cover Letter.docx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      <Header />
      <div className="cl-container">
        <div className="cl-input">
          <h1 className="cl-title">Fill Cover Letter Template</h1>
          <input className="upload" type="file" onChange={onFileChange} />
          {/* <button onClick={onUpload}>Upload!</button> */}
          {Object.keys(fields).length > 0 && fieldForms}
          {downloadUrl && (
            <button className="cl-download" onClick={downloadCoverLetter}>Download</button>
          )}
        </div>
        <div className="cl-preview"></div>
      </div>
    </>
  );
}
