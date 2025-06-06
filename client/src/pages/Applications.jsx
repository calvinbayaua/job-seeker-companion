import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import ApplicationsTable from "../components/ApplicationsTable";

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
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/applications/"
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

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
      fetchApplications();
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
              <div className="appl-form-buttons">
                {["Full Time", "Part Time", "Contract", "Internship"].map(
                  (type) => (
                    <button
                      key={type}
                      type="button"
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
              <label>Location Type</label>
              <div className="appl-form-buttons">
                {["On-site", "Hybrid", "Remote"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={input.locationType === type ? "selected" : ""}
                    onClick={() =>
                      setInput((prev) => ({ ...prev, locationType: type }))
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label>Easy Apply</label>
              <div className="appl-form-buttons">
                {["Yes", "No"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={input.easyApply === type ? "selected" : ""}
                    onClick={() =>
                      setInput((prev) => ({ ...prev, easyApply: type }))
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label>Cover Letter</label>
              <div className="appl-form-buttons">
                {["Yes", "No"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={input.coverLetterSent === type ? "selected" : ""}
                    onClick={() =>
                      setInput((prev) => ({ ...prev, coverLetterSent: type }))
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>
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

            <div>
              <label htmlFor="link">Link</label>
              <input
                name="link"
                type="text"
                value={input.link}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Status</label>
              <div className="appl-form-buttons">
                {["Accepted", "Processing", "Rejected"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={input.status === type ? "selected" : ""}
                    onClick={() =>
                      setInput((prev) => ({ ...prev, status: type }))
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="appl-preview">
          <ApplicationsTable applications={applications} />
        </div>
      </div>
    </>
  );
}
