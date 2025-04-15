// import React, { useState } from "react";
// import styles from "../styles/UserJobcard.module.css";

// const JobCard = ({ job, onApply }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [applying, setApplying] = useState(false);

//   const handleApply = async () => {
//     setApplying(true);
//     try {
//       await onApply(job._id);
//       setExpanded(false);
//     } finally {
//       setApplying(false);
//     }
//   };

//   return (
//     <div className={`${styles.card} ${expanded ? styles.expanded : ''}`}>
//       <div className={styles.cardHeader}>
//         <div className={styles.companyHeader}>
//           {/* Display actual logo if available, otherwise show initial */}
//           {job.logo ? (
//             <img 
//               src={job.logo} 
//               alt={`${job.company || job.name || 'Company'} logo`} 
//               className={styles.companyLogo}
//             />
//           ) : (
//             <div className={styles.companyLogoFallback}>
//               {job.company ? job.company.charAt(0).toUpperCase() : 'C'}
//             </div>
//           )}
//           <div className={styles.companyText}>
//             <h3>{job.title}</h3>
//             <div className={styles.companyMeta}>
//               <p className={styles.companyName}>{job.company || job.name || 'Company'}</p>
//               <span className={styles.jobType}>{job.jobType}</span>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className={styles.cardBody}>
//         <div className={styles.locationSalary}>
//           <p className={styles.location}>{job.location}</p>
//           <div className={styles.salary}>
//             <span>💵</span> {job.salary || 'Salary not specified'}
//           </div>
//         </div>
        
//         {expanded ? (
//           <div className={styles.details}>
//             {job.duration && (
//               <div className={styles.detailRow}>
//                 <span>Duration:</span>
//                 <span>{job.duration}</span>
//               </div>
//             )}
//             {job.skills && (
//               <div className={styles.detailRow}>
//                 <span>Skills:</span>
//                 <span>{Array.isArray(job.skills) ? job.skills.join(', ') : job.skills}</span>
//               </div>
//             )}
//             {job.eligibleBatch && (
//               <div className={styles.detailRow}>
//                 <span>Eligible Batch:</span>
//                 <span>{Array.isArray(job.eligibleBatch) ? job.eligibleBatch.join(', ') : job.eligibleBatch}</span>
//               </div>
//             )}
//             {job.eligibleBranch && (
//               <div className={styles.detailRow}>
//                 <span>Eligible Branch:</span>
//                 <span>{Array.isArray(job.eligibleBranch) ? job.eligibleBranch.join(', ') : job.eligibleBranch}</span>
//               </div>
//             )}
            
//             <div className={styles.description}>
//               <h4>Job Description</h4>
//               <p>{job.description}</p>
//             </div>
            
//             <div className={styles.actions}>
//               <button 
//                 className={styles.cancelButton}
//                 onClick={() => setExpanded(false)}
//               >
//                 Back
//               </button>
//               <button 
//                 className={styles.applyButton}
//                 onClick={handleApply}
//                 disabled={applying}
//               >
//                 {applying ? 'Applying...' : 'Apply Now'}
//               </button>
//             </div>
//           </div>
//         ) : (
//           <button 
//             className={styles.viewButton}
//             onClick={() => setExpanded(true)}
//           >
//             View Details
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobCard;

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
    <p className={styles.companyName}>{job.company}</p>
    <p className={styles.location}>{job.location}</p>
  </div>
</div>


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