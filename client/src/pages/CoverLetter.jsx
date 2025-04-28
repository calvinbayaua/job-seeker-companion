import axios from "axios";
import React, { useState } from "react";
import Header from "../components/Header";

export default function CoverLetter() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fields, setFields] = useState([]);
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/coverletter",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFields(response.data.fields);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
  };

  // Convert to axios
  const fieldForms = (
    <form onSubmit={handleSubmit} method="POST">
      {fields.map((field) => {
        return (
          <div key={field}>
            <label htmlFor={field}>{field}: </label>
            <input id={field} name={field} type="text" />
          </div>
        );
      })}
      <button>Submit</button>
    </form>
  );

  const fileData = selectedFile ? (
    <div>
      <h2>File Details:</h2>
      <p>File Name: {selectedFile.name}</p>
      <p>File Type: {selectedFile.type}</p>
    </div>
  ) : (
    <div>
      <br />
      <h4>Choose before Pressing the Upload button</h4>
    </div>
  );

  return (
    <div>
      <Header />
      <h1>Cover Letter Tools</h1>
      <h3>File Upload using React!</h3>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {fileData}
      {fieldForms}
    </div>
  );
}
