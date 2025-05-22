import { useState } from "react";
import Header from "../components/Header";

export default function Applications() {
  const [input, setInput] = useState({
    companyName: "",
    jobTitle: "",
    location: "",
    date: "",
  });

  const handleChange = () => {};

  const handleSubmit = () => {};

  return (
    <>
      <Header />
      <div className="appl-container">
        <div className="appl-input">
          <h1 className="appl-title">Add Application</h1>
          <form className="appl-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                id="companyName"
                type="text"
                name="companyName"
                value={input.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                id="jobTitle"
                type="text"
                name="jobTitle"
                value={input.jobTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                name="location"
                value={input.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateApplied">Date Applied</label>
              <input
                id="dateApplied"
                type="date"
                name="dateApplied"
                value={input.dateApplied}
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
