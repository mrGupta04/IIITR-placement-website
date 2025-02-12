import { useState } from "react";
import styles from "../styles/Stats.module.css";

const Stats = () => {
  
  const [selectedBatch, setSelectedBatch] = useState("");

 
  const data = {
    overall: { total: 500, placed: 350 },
    batches: {
      "2021-2022": {
        CSE: { total: 45, placed: 25 },
      },
      "2020-2021": {
        CSE: { total: 100, placed: 80 },
      },
      "2019-2020": {
        CSE: { total: 120, placed: 90 },
      },
      
    },
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📊 Placement Statistics</h1>

      <div className={styles.dropdown}>
        <label className={styles.label}>Select Batch: </label>
        <select
          className={styles.selectBox}
          onChange={(e) => setSelectedBatch(e.target.value)}
          value={selectedBatch}
        >
          <option value="">Overall</option>
          {Object.keys(data.batches).map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>
      </div>

      {!selectedBatch ? (
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Overall Statistics</h2>
          <p><strong>Total Students:</strong> {data.overall.total}</p>
          <p><strong>Placed Students:</strong> {data.overall.placed}</p>
        </div>
      ) : (
        <div className={styles.batch}>
          <h2 className={styles.cardTitle}>{selectedBatch} Batch Statistics</h2>
          {Object.entries(data.batches[selectedBatch]).map(([branch, stats]) => (
            <div key={branch} className={styles.branchCard}>
              <h3>{branch}</h3>
              <p><strong>Total Students:</strong> {stats.total}</p>
              <p><strong>Placed Students:</strong> {stats.placed}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stats;
