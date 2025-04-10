import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import styles from "../../styles/Jobupdate.module.css";

const skillsOptions = [
  { value: "Python", label: "Python" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "SQL", label: "SQL" },
  { value: "Node.js", label: "Node.js" },
  { value: "AWS", label: "AWS" },
  { value: "Django", label: "Django" },
  { value: "C++", label: "C++" },
  { value: "Java", label: "Java" }
];

const batchOptions = [
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" }
];

const UpdateJobForm = () => {
  const router = useRouter();
  const { jobId } = router.query;

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

  useEffect(() => {
    if (!router.isReady || !jobId) return;

    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/api/auth/admin/jobs/${jobId}`);
        if (!response.ok) throw new Error("Failed to fetch job details");

        const data = await response.json();

        setJobData({
          title: data.job.title || "",
          location: data.job.location || "",
          salary: data.job.salary || "",
          skills: data.job.skills || [],
          eligibleBatch: data.job.eligibleBatch || [],
          description: data.job.description || ""
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [router.isReady, jobId]);

  const handleCancel = () => {
    router.push("/admin/appliedjob");
  };

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

      router.push("/admin/appliedjob");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className={styles.loadingText}>Loading...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.jobForm}>
        <h2 className={styles.heading}>Job Update Form</h2>

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
          className={styles.dropdownskills}
          isMulti
          value={skillsOptions.filter((option) =>
            jobData.skills.includes(option.value)
          )}
          onChange={(selected) =>
            setJobData({ ...jobData, skills: selected.map((s) => s.value) })
          }
        />

        <label>Eligible Batch</label>
        <Select
          options={batchOptions}
          className={styles.dropdownskills}
          isMulti
          value={batchOptions.filter((option) =>
            jobData.eligibleBatch.includes(option.value)
          )}
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

        <div className={styles.buttonsection}>
          <button
            type="button"
            className={styles.cancelbutton}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submitbutton}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.loading}></span>
            ) : (
              "Update Job"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateJobForm;
