import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import JobCard from "./jobCard";

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!jobs || jobs.length === 0) return <p>No jobs found.</p>;

    return (
        <div>
            <h2>Jobs for {storedAdmin?.email}</h2>
            <div className="job-list">
                {jobs.map((job) => (
                    <div key={job._id}>
                        <JobCard job={job} />
                        <button onClick={() => router.push("/admin/appliedstudent")}>
                            Applied students
                        </button>
                        <button onClick={() => {
                            console.log("Navigating to job update with jobId:", job._id);
                            router.push(`/admin/jobupdate?jobId=${job._id}`);
                        }}>
                            Modify
                        </button>
                        <button onClick={() => handleDelete(job._id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppliedJobs;
