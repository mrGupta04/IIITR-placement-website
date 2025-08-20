import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import JobCard from "./jobcard";
import styles from "../styles/Jobportal.module.css";

const JobPortal = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/auth/jobs");

        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data = await res.json();
        if (data.userjobs) {
          const normalizedJobs = data.userjobs.reduce((acc, job) => {
            if (!acc.find((j) => j._id === job._id)) {
              acc.push({
                ...job,
                title: job.title || "",
                company: job.name || "",
                logo: job.logo || "/default-logo.png",
                skills: Array.isArray(job.skills)
                  ? job.skills.join(", ")
                  : job.skills || "",
                jobType: job.jobType?.toLowerCase().includes("intern")
                  ? "Internship"
                  : "Full-time",
                location: job.location || "",
                salary: job.salary ? job.salary.toString() : "",
                description: job.description || "",
              });
            }
            return acc;
          }, []);
          setJobs(normalizedJobs);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const applyForJob = async (jobId) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please log in to apply for this job!");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      if (!user._id) {
        alert("Please log in first to apply for this job");
        return;
      }

      const res = await fetch("/api/auth/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user._id, job_id: jobId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to apply.");
      }

      alert("Successfully applied for the job!");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesType =
      jobTypeFilter === "all" ||
      (jobTypeFilter === "internship" && job.jobType === "Internship") ||
      (jobTypeFilter === "fulltime" && job.jobType === "Full-time");

    if (!searchTerm.trim()) return matchesType;

    const searchTermLower = searchTerm.toLowerCase();

    return (
      matchesType &&
      (job.title.toLowerCase().includes(searchTermLower) ||
        job.company.toLowerCase().includes(searchTermLower) ||
        job.skills.toLowerCase().includes(searchTermLower) ||
        job.jobType.toLowerCase().includes(searchTermLower) ||
        job.location.toLowerCase().includes(searchTermLower) ||
        job.salary.includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTermLower))
    );
  });

  // ✅ Corrected back to profile handler
  const handleBackToProfile = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Discover Your Dream Career</h1>
          <p>
            Connect with <span>top companies</span> and find opportunities
            that match your skills and aspirations.
          </p>
          <button onClick={handleBackToProfile} className={styles.backButton}>
            ← Back to Profile
          </button>
        </div>
      </div>

      {/* Job Search Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search jobs by title, company, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterButton} ${
              jobTypeFilter === "all" ? styles.activeFilter : ""
            }`}
            onClick={() => setJobTypeFilter("all")}
          >
            All Jobs
          </button>
          <button
            className={`${styles.filterButton} ${
              jobTypeFilter === "internship" ? styles.activeFilter : ""
            }`}
            onClick={() => setJobTypeFilter("internship")}
          >
            Internships
          </button>
          <button
            className={`${styles.filterButton} ${
              jobTypeFilter === "fulltime" ? styles.activeFilter : ""
            }`}
            onClick={() => setJobTypeFilter("fulltime")}
          >
            Full-time
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className={styles.jobsContainer}>
        <h2 className={styles.sectionTitle}>Available Opportunities</h2>

        {error ? (
          <div className={styles.error}>
            <p>Error loading jobs: {error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading opportunities...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className={styles.jobGrid}>
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} onApply={applyForJob} />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <img src="/images/no-jobs.svg" alt="No jobs found" />
            <h3>No matching jobs found</h3>
            <p>Try adjusting your search or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPortal;
