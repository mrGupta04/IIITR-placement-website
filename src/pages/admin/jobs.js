import React, { useState } from "react";
import JobForm from "./jobform.js";
import AppliedJobs from "./appliedjob.js";

const Jobs = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div className="jobs-container">
      <div className="button-group">
        <button onClick={() => setActiveComponent("postJob")}>Post New Job</button>
        <button onClick={() => setActiveComponent("postedJobs")}>Posted Jobs</button>
      </div>

      <div className="content">
        {activeComponent === "postJob" && <JobForm />}
        {activeComponent === "postedJobs" && <AppliedJobs />}
      </div>
    </div>
  );
};

export default Jobs;
