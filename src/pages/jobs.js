import React, { useEffect, useState } from "react";
import JobCard from "./jobcard";
import styles from "../styles/Jobportal.module.css";
import Link from "next/link";

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/auth/jobs");
        const data = await res.json();
        if (data.userjobs) {
          // Remove duplicate jobs based on job ID
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
      }
    };

    fetchJobs();
  }, []);

  // Function to handle job application
  const applyForJob = async (jobId) => {
    console.log("Applying for job with ID:", jobId);

    // Check if the user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please log in to apply for this job!");
      return;
    }

    // Parse user data from localStorage
    let user;
    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      alert("Invalid user data. Please log in again.");
      return;
    }

    // Ensure user ID exists
    if (!user._id) {
      alert(" Please log in first to apply for this job");
      return;
    }

    const userId = user._id;
    console.log("User ID:", userId);

    try {
      const res = await fetch("/api/auth/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Send JSON data
        },
        body: JSON.stringify({ user_id: userId, job_id: jobId }), // Convert object to JSON string
      });

      // Ensure response is OK before parsing
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to apply.");
      }

      const data = await res.json();
      alert("Successfully applied for the job!");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      {/* 🔷 Welcome Section */}
      <div className={styles.welcomeSection}>
        <h1>Welcome to IIIT Raicchur Placement website!</h1>
        <p>
          Stay connected with <strong>modern opportunities</strong> and{" "}
          <strong>exciting career paths</strong>. Join us today and get access
          to <strong>exclusive job listings</strong>!
        </p>
        <div className={styles.authButtons}>
          <Link href="/profile">
            <button className={styles.signupBtn}>Login</button>
          </Link>
         
        </div>
      </div>

      {/* 🔷 Job Listings Section */}
      <div className={styles.jobsSection}>
        <h2>Latest Job Opportunities</h2>
        <div className={styles.jobGrid}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className={styles.jobCardWrapper}>
                <JobCard job={job} onApply={applyForJob} />
              </div>
            ))
          ) : (
            <p className={styles.noJobs}>No job postings available right now.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPortal;
