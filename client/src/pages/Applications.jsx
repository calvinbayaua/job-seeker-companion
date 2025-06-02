import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

export default function Applications() {
  const [input, setInput] = useState({
    companyName: "",
    jobTitle: "",
    jobType: "",
    location: "",
    locationType: "",
    date: "",
    link: "",
    easyApply: "",
    coverLetterSent: "",
    status: "",
  });

  const handleChange = (event) => {
    setInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/applications/submit",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("POST request sent: ", response.data);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="appl-container">
        <div className="appl-input">
          <h1 className="appl-title">Add Application</h1>
          <form className="appl-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="companyName">Company Name</label>
              <input
                name="companyName"
                type="text"
                value={input.companyName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="jobTitle">Job Title</label>
              <input
                name="jobTitle"
                type="text"
                value={input.jobTitle}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Job Type</label>
              <div className="job-type-buttons">
                {["Full Time", "Part Time", "Contract", "Internship"].map(
                  (type) => (
                    <button
                      key={type}
                      className={input.jobType === type ? "selected" : ""}
                      onClick={() =>
                        setInput((prev) => ({ ...prev, jobType: type }))
                      }
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <label htmlFor="location">Location</label>
              <input
                name="location"
                type="text"
                value={input.location}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="date">Date Applied</label>
              <input
                name="date"
                type="date"
                value={input.date}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="appl-preview"></div>
      </div>
    </>
  );
}
