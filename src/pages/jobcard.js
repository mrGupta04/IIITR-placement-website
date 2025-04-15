import React, { useState } from "react";
import styles from "../styles/UserJobcard.module.css";

const JobCard = ({ job = {}, onApply = () => {} }) => {
  // Provide safe defaults for all job properties
  const {
    _id = '',
    title = 'Job Title Not Available',
    jobType = 'Not Specified',
    company = 'Company Not Specified',
    location = 'Location Not Specified',
    salary = 'Salary Not Disclosed',
    duration = 'Duration Not Specified',
    skills = [],
    eligibleBatch = [],
    eligibleBranch = [],
    description = 'No job description available'
  } = job;

  const [expanded, setExpanded] = useState(false);
  const [applying, setApplying] = useState(false);

  const handleApply = async () => {
    setApplying(true);
    try {
      await onApply(_id);
      setExpanded(false);
    } finally {
      setApplying(false);
    }
  };

  // If job object is completely empty (fallback)
  if (!job || Object.keys(job).length === 0) {
    return (
      <div className={styles.card}>
        <div className={styles.cardError}>
          Job information could not be loaded.
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.card} ${expanded ? styles.expanded : ''}`}>
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
        <span className={styles.jobType}>{jobType}</span>
      </div>
      
      <div className={styles.companyInfo}>
        <div className={styles.companyLogo}>
          {company.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className={styles.companyName}>{company}</p>
          <p className={styles.location}>{location}</p>
        </div>
      </div>
      
      <div className={styles.salary}>
        <span>💵</span> {salary}
      </div>
      
      {expanded ? (
        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span>Duration:</span>
            <span>{duration}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Skills:</span>
            <span>{Array.isArray(skills) ? skills.join(', ') : skills}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Eligible Batch:</span>
            <span>{Array.isArray(eligibleBatch) ? eligibleBatch.join(', ') : eligibleBatch}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Eligible Branch:</span>
            <span>{Array.isArray(eligibleBranch) ? eligibleBranch.join(', ') : eligibleBranch}</span>
          </div>
          
          <div className={styles.description}>
            <h4>Job Description</h4>
            <p>{description}</p>
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