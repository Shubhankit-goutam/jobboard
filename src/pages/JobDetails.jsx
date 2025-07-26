import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/jobs/${id}`)
      .then((res) => {
        const jobData = res.data?.data || res.data;
        if (jobData) {
          setJob(jobData);
        } else {
          setError("Job not found or malformed response.");
        }
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
        setError("Failed to load job.");
      });
  }, [id]);

  if (error)
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  if (!job)
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="card-title mb-4 text-primary">{job.title}</h2>
        <p className="card-text"><strong>Company:</strong> {job.company}</p>
        <p className="card-text"><strong>Type:</strong> {job.type}</p>
        <p className="card-text"><strong>Location:</strong> {job.location}</p>
        <p className="card-text"><strong>Description:</strong></p>
        <p className="card-text">{job.description}</p>
        <a href="/" className="btn btn-secondary mt-3">← Back to Listings</a>
      </div>
    </div>
  );
}

export default JobDetails;
