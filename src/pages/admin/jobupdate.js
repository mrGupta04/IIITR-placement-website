import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import styles from "../../styles/jobForm.module.css";

const skillsOptions = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" }
];

const batchOptions = [
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" }
];

const UpdateJobForm = () => {
    const router = useRouter();
    const { jobId } = router.query;  // Get jobId from URL query params

    const [jobData, setJobData] = useState({
        title: "",
        location: "",
        salary: "",
        skills: [],
        eligibleBatch: [],
        description: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch job details when component mounts
    useEffect(() => {
        if (!router.isReady || !jobId) return;

        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`/api/auth/admin/jobs/${jobId}`);
                if (!response.ok) throw new Error("Failed to fetch job details");

                const data = await response.json();
                setJobData({
                    title: data.title || "",
                    location: data.location || "",
                    salary: data.salary || "",
                    skills: data.skills || [],
                    eligibleBatch: data.eligibleBatch || [],
                    description: data.description || ""
                });

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [router.isReady, jobId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`/api/auth/admin/jobs/${jobId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobData),
            });

            if (!response.ok) throw new Error("Failed to update job");

            alert("Job updated successfully!");
            router.push("/jobs");  // Redirect after update
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit} className={styles.jobForm}>
            <label>Job Title</label>
            <input
                type="text"
                value={jobData.title}
                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                required
            />

            <label>Location</label>
            <input
                type="text"
                value={jobData.location}
                onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                required
            />

            <label>Salary</label>
            <input
                type="text"
                value={jobData.salary}
                onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
            />

            <label>Skills Required</label>
            <Select
                options={skillsOptions}
                isMulti
                value={jobData.skills.map((s) => ({ value: s, label: s }))}
                onChange={(selected) =>
                    setJobData({ ...jobData, skills: selected.map((s) => s.value) })
                }
            />

            <label>Eligible Batch</label>
            <Select
                options={batchOptions}
                isMulti
                value={jobData.eligibleBatch.map((b) => ({ value: b, label: b }))}
                onChange={(selected) =>
                    setJobData({ ...jobData, eligibleBatch: selected.map((b) => b.value) })
                }
            />

            <label>Job Description</label>
            <textarea
                value={jobData.description}
                onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                required
            />

            <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Job"}
            </button>
        </form>
    );
};

export default UpdateJobForm;
