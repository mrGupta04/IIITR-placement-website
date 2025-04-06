import React from 'react';
import styles from '../../styles/Jobcard.module.css';

const JobCard = ({ job }) => {
  return (
    <div className={styles.jobCard}>
      <div className={styles.jobCardHeader}>
        <h3>{job.title}</h3>
      </div>
      <div className={styles.jobCardBody}>
        <p><strong>Type:</strong> <span>{job.jobType}</span></p>
        <p><strong>Email:</strong> <span>{job.email}</span></p>
        <p><strong>Location:</strong> <span>{job.location}</span></p>
        <p><strong>Salary:</strong> <span>{job.salary}</span></p>
        <p><strong>Description:</strong> <span>{job.description}</span></p>
        <p><strong>Duration:</strong> <span>{job.duration}</span></p>
        <p><strong>Status:</strong> <span>{job.status}</span></p>
        <p><strong>Skills:</strong> <span>{job.skills.join(", ") || "N/A"}</span></p>
        <p><strong>Eligible Batch:</strong> <span>{job.eligibleBatch.join(", ") || "N/A"}</span></p>
        <p><strong>Eligible Branch:</strong> <span>{job.eligibleBranch.join(", ") || "N/A"}</span></p>
      </div>
    </div>
  );
};

export default JobCard;
