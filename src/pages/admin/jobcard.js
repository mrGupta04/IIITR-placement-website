import React from 'react';
import styles from '../../styles/Jobcard.module.css';

const JobCard = ({ job }) => {
  // First, check if job is undefined or null
  if (!job) {
    return (
      <div className={styles.jobCard}>
        <div className={styles.jobCardHeader}>
          <h3 className={styles.jobTitle}>No Job Data Available</h3>
        </div>
        <div className={styles.jobCardBody}>
          <p>The job information could not be loaded. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Safely destructure with defaults
  const {
    _id = '',
    title = 'No Title Available',
    status = 'Unknown Status',
    jobType = 'Not Specified',
    location = 'Location Not Specified',
    salary = 'Not Disclosed',
    duration = 'Not Specified',
    description = 'No description provided',
    skills = [],
    eligibleBatch = [],
    eligibleBranch = [],
    email = null
  } = job;

  // Status color mapping
  const statusColorMap = {
    'open': '#4CAF50',
    'closed': '#F44336',
    'draft': '#FFC107',
    'paused': '#9E9E9E',
    'default': '#9E9E9E'
  };

  const statusLower = (status || '').toLowerCase();
  const statusColor = statusColorMap[statusLower] || statusColorMap['default'];

  return (
    <div className={styles.jobCard} key={_id || 'no-id'}>
      <div className={styles.jobCardHeader}>
        <h3 className={styles.jobTitle}>{title}</h3>
        <span 
          className={styles.jobStatus}
          style={{ backgroundColor: statusColor }}
        >
          {status}
        </span>
      </div>
      
      <div className={styles.jobCardBody}>
        <div className={styles.jobMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Type:</span>
            <span className={styles.metaValue}>{jobType}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Location:</span>
            <span className={styles.metaValue}>{location}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Salary:</span>
            <span className={styles.metaValue}>{salary}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Duration:</span>
            <span className={styles.metaValue}>{duration}</span>
          </div>
        </div>
        
        <div className={styles.jobDescription}>
          <h4 className={styles.sectionTitle}>Description</h4>
          <p>{description}</p>
        </div>
        
        <div className={styles.jobRequirements}>
          <div className={styles.requirementsSection}>
            <h4 className={styles.sectionTitle}>Skills Required</h4>
            <div className={styles.tags}>
              {skills && skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span key={`skill-${index}`} className={styles.tag}>{skill}</span>
                ))
              ) : (
                <span className={styles.tag}>None specified</span>
              )}
            </div>
          </div>
          
          <div className={styles.requirementsSection}>
            <h4 className={styles.sectionTitle}>Eligibility</h4>
            <div className={styles.eligibility}>
              <div className={styles.eligibilityItem}>
                <span className={styles.eligibilityLabel}>Batch:</span>
                <div className={styles.tags}>
                  {eligibleBatch && eligibleBatch.length > 0 ? (
                    eligibleBatch.map((batch, index) => (
                      <span key={`batch-${index}`} className={styles.tag}>{batch}</span>
                    ))
                  ) : (
                    <span className={styles.tag}>Any</span>
                  )}
                </div>
              </div>
              <div className={styles.eligibilityItem}>
                <span className={styles.eligibilityLabel}>Branch:</span>
                <div className={styles.tags}>
                  {eligibleBranch && eligibleBranch.length > 0 ? (
                    eligibleBranch.map((branch, index) => (
                      <span key={`branch-${index}`} className={styles.tag}>{branch}</span>
                    ))
                  ) : (
                    <span className={styles.tag}>Any</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.contactInfo}>
          <span className={styles.contactLabel}>Contact Email:</span>
          {email ? (
            <a href={`mailto:${email}`} className={styles.contactLink}>{email}</a>
          ) : (
            <span className={styles.contactLink}>Not provided</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Add default props to ensure component works even when job is not provided
JobCard.defaultProps = {
  job: null
};

export default JobCard;