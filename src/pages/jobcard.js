import React, { useState } from "react";
import styles from "../styles/UserJobcard.module.css";

const JobCard = ({ job, onApply }) => {
  const [expanded, setExpanded] = useState(false);
  const [applying, setApplying] = useState(false);

  const handleApply = async () => {
    setApplying(true);
    try {
      await onApply(job._id);
      setExpanded(false);
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className={`${styles.card} ${expanded ? styles.expanded : ''}`}>
      <div className={styles.cardHeader}>
        <h3>{job.title}</h3>
        <span className={styles.jobType}>{job.jobType}</span>
      </div>
      <div className={styles.companyInfo}>
  <div className={styles.companyLogo}>
    {job.company ? job.company.charAt(0).toUpperCase() : ''}
  </div>
  <div>
    <p className={styles.companyName}>{job.company}</p>
    <p className={styles.location}>{job.location}</p>
  </div>
</div>

      
      <div className={styles.salary}>
        <span>💵</span> {job.salary}
      </div>
      
      {expanded ? (
        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span>Duration:</span>
            <span>{job.duration}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Skills:</span>
            <span>{job.skills}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Eligible Batch:</span>
            <span>{job.eligibleBatch}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Eligible Branch:</span>
            <span>{job.eligibleBranch}</span>
          </div>
          
          <div className={styles.description}>
            <h4>Job Description</h4>
            <p>{job.description}</p>
          </div>
          
          <div className={styles.actions}>
            <button 
              className={styles.cancelButton}
              onClick={() => setExpanded(false)}
            >
              Back
            </button>
            <button 
              className={styles.applyButton}
              onClick={handleApply}
              disabled={applying}
            >
              {applying ? 'Applying...' : 'Apply Now'}
            </button>
          </div>
        </div>
      ) : (
        <button 
          className={styles.viewButton}
          onClick={() => setExpanded(true)}
        >
          View Details
        </button>
      )}
    </div>
  );
};

export default JobCard;