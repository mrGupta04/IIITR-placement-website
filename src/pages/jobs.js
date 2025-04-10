import React, { useEffect, useState } from "react";
import JobCard from "./jobcard";
import styles from "../styles/Jobportal.module.css";
import Link from "next/link";

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/auth/jobs");
        const data = await res.json();
        if (data.userjobs) {
          const uniqueJobs = data.userjobs.reduce((acc, job) => {
            if (!acc.find((j) => j._id === job._id)) {
              acc.push(job);
            }
            return acc;
          }, []);
          setJobs(uniqueJobs);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
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

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Discover Your Dream Career</h1>
          <p>
            Connect with <span>top companies</span> and find opportunities that match your skills and aspirations.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/profile" className={styles.primaryButton}>
              Student Login
            </Link>
            <Link href="/recruiter" className={styles.secondaryButton}>
              Recruiter Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Job Search Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search jobs by title, company or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
        <div className={styles.filterButtons}>
          <button className={styles.filterButton}>All Jobs</button>
          <button className={styles.filterButton}>Internships</button>
          <button className={styles.filterButton}>Full-time</button>
        </div>
      </div>

      {/* Job Listings */}
      <div className={styles.jobsContainer}>
        <h2 className={styles.sectionTitle}>Available Opportunities</h2>
        
        {loading ? (
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