import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
const API_BASE_URL = process.env.REACT_APP_API_URL;
function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/jobs`)
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setJobs(res.data.data);
        } else {
          setError("Unexpected response format from server.");
          setJobs([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again.");
      });
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />

      <div className="container mt-4">
        <h2 className="mb-4">Job Listings</h2>

        <input
          type="text"
          placeholder="Search by title or location"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); 
          }}
          className="form-control mb-3"
        />

        {error && <p className="text-danger">{error}</p>}

        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <div key={job._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="card-text">
                  {job.company} - {job.location} ({job.type})
                </p>
                <Link to={`/job/${job._id}`} className="btn btn-sm btn-outline-primary">
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs found</p>
        )}

        
        {totalPages > 1 && (
          <nav>
            <ul className="pagination justify-content-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(page)}>
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}

export default Home;
