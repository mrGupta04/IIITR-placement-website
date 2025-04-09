import React, { useState } from "react";
import JobForm from "./jobform.js";
import AppliedJobs from "./appliedjob.js";
import styles from '../../styles/jobs.module.css';

const Jobs = () => {
  const [activeComponent, setActiveComponent] = useState("postJob");

  return (
    <div className={styles.jobsDashboard}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Job Management</h1>
        <p className={styles.dashboardSubtitle}>Post new opportunities or manage existing job listings</p>
      </div>

      <div className={styles.navigationTabs}>
        <button
          className={`${styles.tabButton} ${activeComponent === "postJob" ? styles.activeTab : ''}`}
          onClick={() => setActiveComponent("postJob")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Post New Job
        </button>
        <button
          className={`${styles.tabButton} ${activeComponent === "postedJobs" ? styles.activeTab : ''}`}
          onClick={() => setActiveComponent("postedJobs")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Posted Jobs
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeComponent === "postJob" && <JobForm />}
        {activeComponent === "postedJobs" && <AppliedJobs />}
      </div>
    </div>
  );
};

export default Jobs;