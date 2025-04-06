import React, { useState } from "react";
import JobForm from "./jobform.js";
import AppliedJobs from "./appliedjob.js";
import styles from '../../styles/jobs.module.css'

const Jobs = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div className={styles.jobsContainer}>
  <div className={styles.buttonGroup}>
    <button onClick={() => setActiveComponent("postJob")}>Post New Job</button>
    <button onClick={() => setActiveComponent("postedJobs")}>Posted Jobs</button>
  </div>

  <div className={styles.content}>
    {activeComponent === "postJob" && <JobForm />}
    {activeComponent === "postedJobs" && <AppliedJobs />}
  </div>
</div>

  );
};

export default Jobs;
