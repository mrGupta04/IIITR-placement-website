const JobCard = ({ job }) => {
    return (
      <div className="job-card">
        <h3>{job.title}</h3>
        <p><strong>Type:</strong> {job.jobType}</p>
        <p><strong>Email:</strong> {job.email}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Duration:</strong> {job.duration}</p>
        <p><strong>Status:</strong> {job.status}</p>
        
        <p><strong>Skills:</strong> {job.skills.join(", ") || "N/A"}</p>
        <p><strong>Eligible Batch:</strong> {job.eligibleBatch.join(", ") || "N/A"}</p>
        <p><strong>Eligible Branch:</strong> {job.eligibleBranch.join(", ") || "N/A"}</p>
      </div>
    );
  };
  
  export default JobCard;
  