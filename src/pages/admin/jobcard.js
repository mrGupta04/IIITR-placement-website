import React from 'react';
import styles from '../../styles/Jobcard.module.css';

const JobCard = ({ job }) => {
  const statusColorMap = {
    'open': '#4CAF50',
    'closed': '#F44336',
    'draft': '#FFC107',
    'paused': '#9E9E9E'
  };

  // Safely handle undefined/null job or job.status
  const status = job?.status?.toLowerCase() || '';
  const statusColor = statusColorMap[status] || '#9E9E9E';

  return (
    <div className={styles.jobCard}>
      <div className={styles.jobCardHeader}>
        <h3 className={styles.jobTitle}>{job?.title || 'No Title'}</h3>
        <span 
          className={styles.jobStatus}
          style={{ backgroundColor: statusColor }}
        >
          {job?.status || 'Unknown Status'}
        </span>
      </div>
      
      <div className={styles.jobCardBody}>
        <div className={styles.jobMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Type:</span>
            <span className={styles.metaValue}>{job?.jobType || 'N/A'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Location:</span>
            <span className={styles.metaValue}>{job?.location || 'N/A'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Salary:</span>
            <span className={styles.metaValue}>{job?.salary || 'N/A'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Duration:</span>
            <span className={styles.metaValue}>{job?.duration || 'N/A'}</span>
          </div>
        </div>
        
        <div className={styles.jobDescription}>
          <h4 className={styles.sectionTitle}>Description</h4>
          <p>{job?.description || 'No description available'}</p>
        </div>
        
        <div className={styles.jobRequirements}>
          <div className={styles.requirementsSection}>
            <h4 className={styles.sectionTitle}>Skills Required</h4>
            <div className={styles.tags}>
              {job?.skills?.length ? (
                job.skills.map((skill, index) => (
                  <span key={index} className={styles.tag}>{skill}</span>
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
                  {job?.eligibleBatch?.length ? (
                    job.eligibleBatch.map((batch, index) => (
                      <span key={index} className={styles.tag}>{batch}</span>
                    ))
                  ) : (
                    <span className={styles.tag}>Any</span>
                  )}
                </div>
              </div>
              <div className={styles.eligibilityItem}>
                <span className={styles.eligibilityLabel}>Branch:</span>
                <div className={styles.tags}>
                  {job?.eligibleBranch?.length ? (
                    job.eligibleBranch.map((branch, index) => (
                      <span key={index} className={styles.tag}>{branch}</span>
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
          {job?.email ? (
            <a href={`mailto:${job.email}`} className={styles.contactLink}>{job.email}</a>
          ) : (
            <span className={styles.contactLink}>Not provided</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;