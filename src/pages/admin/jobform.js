import React, { useState, useEffect } from "react";
import styles from "../../styles/jobForm.module.css";
import { useRouter } from "next/router";
import Select from "react-select";

const skillsOptions = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "Python", label: "Python" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "Java", label: "Java" },
  { value: "C++", label: "C++" },
  { value: "C#", label: "C#" },
];

const batchOptions = [
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

const branchOptions = [
  { value: "CSE", label: "Computer Science (CSE)" },
  { value: "AIDS", label: "Artificial Intelligence and Data Science (AIDS)" },
  { value: "MNC", label: "Mathematics and Computing (MNC)" },
];

const JobForm = () => {
  const router = useRouter();
  const [jobType, setJobType] = useState("Job");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [eligibleBatch, setEligibleBatch] = useState([]);
  const [eligibleBranch, setEligibleBranch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("active");
  const [storedAdmin, setStoredAdmin] = useState(null);

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin")) || null;
    setStoredAdmin(adminData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!storedAdmin) {
      setError("Admin not found. Please log in again.");
      setLoading(false);
      return;
    }

    const jobData = {
      jobType,
      title,
      location,
      salary,
      description,
      status,
      duration: jobType === "Internship" ? duration : null,
      email: storedAdmin.email,
      skills: skills.map((s) => s.value),
      eligibleBatch: eligibleBatch.map((b) => b.value),
      eligibleBranch: eligibleBranch.map((br) => br.value),
    };

    try {
      const res = await fetch("/api/auth/admin/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Job posting failed.");
      }

      alert("Job posted successfully!");
      router.push("/jobs");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/jobs");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Post a Job or Internship</h2>
      {error && <div className={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Job Type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
            className={styles.select}
          >
            <option value="Job">Job</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {jobType === "Internship" && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Duration (in months)</label>
            <input
              type="text"
              min="1"
              placeholder="e.g., 6"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className={styles.input}
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.label}>Job Title</label>
          <input
            type="text"
            placeholder="e.g., Software Engineer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Location</label>
          <input
            type="text"
            placeholder="e.g., Remote, New York"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Salary (Optional)</label>
          <input
            type="text"
            placeholder="e.g., $60,000/year or Unpaid"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Skills Required</label>
          <Select
            options={skillsOptions}
            isMulti
            value={skills}
            onChange={setSkills}
            placeholder="Select required skills..."
            className={styles.reactSelect}
            classNamePrefix="rs"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Eligible Batch</label>
          <Select
            options={batchOptions}
            isMulti
            value={eligibleBatch}
            onChange={setEligibleBatch}
            placeholder="Select eligible batches..."
            className={styles.reactSelect}
            classNamePrefix="rs"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Eligible Branch</label>
          <Select
            options={branchOptions}
            isMulti
            value={eligibleBranch}
            onChange={setEligibleBranch}
            placeholder="Select eligible branches..."
            className={styles.reactSelect}
            classNamePrefix="rs"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Job Description</label>
          <textarea
            placeholder="Describe the job responsibilities, skills required, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles.textarea}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;