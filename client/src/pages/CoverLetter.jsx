import { useState, useRef } from "react";
import axios from "axios";
import { renderAsync } from "docx-preview";
import Header from "../components/Header";

export default function CoverLetter() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fields, setFields] = useState({});
  const [downloadUrl, setDownloadUrl] = useState(null);

  const previewRef = useRef(null);

  // INIT - Initialize selectedFile to new selected file
  // REQ - Send POST request to backend with the uploaded file
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

      // Consider changing fields directly rather than using initialFields
      const initialFields = {};
      response.data.fields.forEach((field) => {
        initialFields[field] = "";
      });
      setFields(initialFields);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const clearForm = () => {
    const clearedFields = {};
    Object.keys(fields).forEach((field) => {
      clearedFields[field] = "";
    });
    setFields(clearedFields);
  };

  // REQ - Send POST request to backend with form data when 'Submit' button is pressed
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

      const arrayBuffer = await blob.arrayBuffer();
      renderAsync(arrayBuffer, previewRef.current);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  // INIT - Initialize form with the extracted fields from the backend response
  const fieldForms = (
    <>
      <form className="cl-form" onSubmit={handleSubmit}>
        {Object.keys(fields).map((field) => {
          return (
            <div key={field}>
              <label htmlFor={field}>{field}:</label>
              <input
                id={field}
                name={field}
                type="text"
                value={fields[field]}
                onChange={
                  (e) =>
                    setFields((prev) => ({ ...prev, [field]: e.target.value })) // Sets fields at every keystroke
                }
              />
            </div>
          );
        })}
        <div className="cl-subclear">
          <button className="cl-submit" type="submit">
            Submit
          </button>
          <button className="cl-clear" onClick={clearForm}>
            X
          </button>
        </div>
      </form>
    </>
  );

  const downloadCoverLetter = () => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "Cover Letter.docx";
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
          {Object.keys(fields).length > 0 && fieldForms}
          {downloadUrl && (
            <button className="cl-download" onClick={downloadCoverLetter}>
              Download
            </button>
          )}
        </div>
        <div className="cl-preview" ref={previewRef}></div>
      </div>
    </>
  );
}
