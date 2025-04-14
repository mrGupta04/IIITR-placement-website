import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import JobCard from "./jobcard";
import styles from "../../styles/Appliedjob.module.css";

const AppliedJobs = () => {
    const router = useRouter();
    const [storedAdmin, setStoredAdmin] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const adminData = JSON.parse(localStorage.getItem("admin")) || null;
        setStoredAdmin(adminData);
    }, []);

    useEffect(() => {
        if (!storedAdmin || !storedAdmin.email) return;

        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/auth/admin/jobs?email=${encodeURIComponent(storedAdmin.email)}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch jobs");
                }
                const data = await response.json();
                setJobs(data.jobs);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [storedAdmin]);

    const handleDelete = async (jobId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/auth/admin/jobs/${jobId}`, {
                method: "DELETE",
            });

            setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        } catch (err) {
            console.error("Error deleting job:", err);
            setError(err.message);
        }
    };

    if (loading) return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}>
                <div className={styles.spinner}></div>
                <p>Loading your job listings...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className={styles.errorState}>
            <div className={styles.errorContent}>
                <div className={styles.errorIcon}>!</div>
                <h3>Something went wrong</h3>
                <p className={styles.errorMessage}>{error}</p>
                <button 
                    className={styles.retryButton}
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        </div>
    );

    if (!jobs || jobs.length === 0) return (
        <div className={styles.emptyState}>
            <div className={styles.emptyIllustration}>
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M9.5 9h5M9.5 12h5"></path>
                </svg>
            </div>
            <h3>No jobs posted yet</h3>
            <p>Get started by creating your first job listing</p>
            <button 
                className={styles.primaryButton}
                onClick={() => router.push("/admin/createjob")}
            >
                Create New Job
            </button>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>Your Job Listings</h1>
                    <p className={styles.subtitle}>Manage and track your posted opportunities</p>
                </div>
                <button 
                    className={styles.createButton}
                    onClick={() => router.push("/admin/jobform")}
                >
                    + New Job
                </button>
            </div>
            
            <div className={styles.jobsGrid}>
                {jobs.map((job) => (
                    <div key={job._id} className={styles.jobCardWrapper}>
                        <JobCard job={job} />
                        <div className={styles.actions}>
                            <button
                                className={`${styles.actionButton} ${styles.viewApplicants}`}
                                onClick={() => router.push(`/admin/appliedstudent?jobId=${job._id}`)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                Applicants
                            </button>
                            <button
                                className={`${styles.actionButton} ${styles.edit}`}
                                onClick={() => router.push(`/admin/jobupdate?jobId=${job._id}`)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Edit
                            </button>
                            <button
                                className={`${styles.actionButton} ${styles.delete}`}
                                onClick={() => handleDelete(job._id)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppliedJobs;