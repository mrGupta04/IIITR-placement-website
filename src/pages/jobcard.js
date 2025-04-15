import React, { useState } from "react";
import styles from "../styles/UserJobcard.module.css";

const JobCard = ({ job, onApply }) => {
  const [expanded, setExpanded] = useState(false);
  const [applying, setApplying] = useState(false);

  // Return null or a loading state if job is undefined
  if (!job) {
    return <div className={styles.card}>Loading job details...</div>;
  }

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
        <h3>{job.title || 'Untitled Job'}</h3>
        {job.jobType && <span className={styles.jobType}>{job.jobType}</span>}
      </div>

      <div className={styles.companyInfo}>
        {job.logo ? (
          <img
            src={job.logo}
            alt={`${job.company || job.name || 'Company'} logo`}
            className={styles.companyLogo}
          />
        ) : (
          <div className={styles.companyLogo}>
            {job.company ? job.company.charAt(0).toUpperCase() : 'C'}
          </div>
        )}
        <div>
          <p className={styles.companyName}>{job.company || 'Unknown Company'}</p>
          {job.location && <p className={styles.location}>{job.location}</p>}
        </div>
      </div>

      {job.salary && (
        <div className={styles.salary}>
          <span>💵</span> {job.salary}
        </div>
      )}

      {expanded ? (
        <div className={styles.details}>
          {job.duration && (
            <div className={styles.detailRow}>
              <span>Duration:</span>
              <span>{job.duration}</span>
            </div>
          )}
          {job.skills && (
            <div className={styles.detailRow}>
              <span>Skills:</span>
              <span>{job.skills}</span>
            </div>
          )}
          {job.eligibleBatch && (
            <div className={styles.detailRow}>
              <span>Eligible Batch:</span>
              <span>{job.eligibleBatch}</span>
            </div>
          )}
          {job.eligibleBranch && (
            <div className={styles.detailRow}>
              <span>Eligible Branch:</span>
              <span>{job.eligibleBranch}</span>
            </div>
          )}

          {job.description && (
            <div className={styles.description}>
              <h4>Job Description</h4>
              <p>{job.description}</p>
            </div>
          )}

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