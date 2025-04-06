import React, { useState } from "react";
import styles from "../styles/JobCard.module.css";

const JobCard = ({ job,onApply }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.jobCard}>
      <h3>{job.title}</h3>
    
      <p><strong>Job Type:</strong> {job.jobType}</p>

      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>

      {expanded ? (
        // 🔹 Expanded View: More details + "Cancel" & "Apply for this Job" buttons
        <>
          <p><strong>Duration:</strong> {job.duration}</p>
          <p><strong>Skills Required:</strong> {job.skills}</p>
          <p><strong>Eligible Batch:</strong> {job.eligibleBatch}</p>
          <p><strong>Eligible Branch:</strong> {job.eligibleBranch}</p>

          <p><strong>Description:</strong> {job.description}</p>

          <div className={styles.actionButtons}>
            <button className={styles.cancelBtn} onClick={() => setExpanded(false)}>Cancel</button>
            <button className={styles.applyNowBtn}
            onClick={()=>onApply(job._id)}
            
            >Apply for this Job</button>
          </div>
        </>
      ) : (
        // 🔹 Initial View: "Apply" button
        <button className={styles.applyBtn} onClick={() => setExpanded(true)}>Apply</button>
      )}
    </div>
  );
};

export default JobCard;
