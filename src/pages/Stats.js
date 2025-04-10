import { useState } from "react";
import styles from "../styles/Stats.module.css";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Award, Users, Briefcase, DollarSign, TrendingUp } from "lucide-react";

// Register chart elements
Chart.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const Stats = () => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedRecruiterType, setSelectedRecruiterType] = useState("all");

  const data = {
    overall: { total: 500, placed: 350 },
    batches: {
      "2021-2022": { CSE: { total: 45, placed: 25 }, AIDS: { total: 30, placed: 20 } },
      "2020-2021": { CSE: { total: 100, placed: 80 }, AIDS: { total: 40, placed: 30 } },
      "2019-2020": { CSE: { total: 120, placed: 90 }, AIDS: { total: 60, placed: 40 } },
    },
    topRecruiters: [
      {
        name: "TechCorp International",
        type: "tech",
        studentsHired: 45,
        avgPackage: "18.5 LPA",
        highestPackage: "24.5 LPA",
        logo: "/logos/img1.jpg",
        consistency: "4+ years",
        roles: ["SDE", "Data Scientist", "Product Manager"]
      },
      {
        name: "GlobalSoft Solutions",
        type: "tech",
        studentsHired: 38,
        avgPackage: "16.8 LPA",
        highestPackage: "22.0 LPA",
        logo: "/logos/img1.jpg",
        consistency: "3+ years",
        roles: ["Frontend Dev", "Backend Dev", "DevOps"]
      },
      {
        name: "FinanceCore Ltd.",
        type: "finance",
        studentsHired: 32,
        avgPackage: "15.2 LPA",
        highestPackage: "20.5 LPA",
        logo: "/logos/img1.jpg",
        consistency: "3+ years",
        roles: ["Financial Analyst", "Risk Manager"]
      },
      {
        name: "DataMinds Analytics",
        type: "analytics",
        studentsHired: 28,
        avgPackage: "14.5 LPA",
        highestPackage: "19.0 LPA",
        logo: "/logos/img1.jpg",
        consistency: "2+ years",
        roles: ["Data Analyst", "ML Engineer"]
      }
    ]
  };

  const overallAvg = ((data.overall.placed / data.overall.total) * 100).toFixed(2);

  const batchAverages = Object.keys(data.batches).reduce((acc, batch) => {
    const totalStudents = Object.values(data.batches[batch]).reduce((sum, branch) => sum + branch.total, 0);
    const placedStudents = Object.values(data.batches[batch]).reduce((sum, branch) => sum + branch.placed, 0);
    acc[batch] = ((placedStudents / totalStudents) * 100).toFixed(2);
    return acc;
  }, {});

  const selectedData = selectedBatch 
    ? data.batches[selectedBatch] 
    : { total: data.overall.total, placed: data.overall.placed };

  const calculateTotalPackageValue = () => {
    return data.topRecruiters.reduce((sum, recruiter) => {
      const avgPackage = parseFloat(recruiter.avgPackage);
      return sum + (avgPackage * recruiter.studentsHired);
    }, 0).toFixed(2);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        <span role="img" aria-label="stats">📊</span> Placement Statistics Dashboard
      </h1>

      {/* Enhanced Summary Cards */}
      <div className={styles.summaryContainer}>
        <div className={styles.summaryCard}>
          <Users size={32} color="#2b6cb0" />
          <h3>Total Students</h3>
          <p>{data.overall.total}</p>
        </div>

        <div className={styles.summaryCard}>
          <Award size={32} color="#48bb78" />
          <h3>Placed Students</h3>
          <p>{data.overall.placed}</p>
        </div>

        <div className={styles.summaryCard}>
          <Briefcase size={32} color="#ed8936" />
          <h3>Placement Rate</h3>
          <p>{overallAvg}%</p>
        </div>

        <div className={styles.summaryCard}>
          <DollarSign size={32} color="#9f7aea" />
          <h3>Total Package Value</h3>
          <p>{calculateTotalPackageValue()} LPA</p>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Batch Selection Panel */}
        <div className={styles.leftPanel}>
          <div className={styles.dropdown}>
            <label className={styles.label}>Select Batch:</label>
            <select 
              className={styles.selectBox} 
              onChange={(e) => setSelectedBatch(e.target.value)} 
              value={selectedBatch}
            >
              <option value="">Overall Statistics</option>
              {Object.keys(data.batches).map((batch) => (
                <option key={batch} value={batch}>
                  {batch} ({batchAverages[batch]}%)
                </option>
              ))}
            </select>
          </div>

          {/* Batch Quick Stats */}
          <div className={styles.quickStats}>
            {selectedBatch && (
              <div className={styles.quickStatsCard}>
                <h4>Quick Overview</h4>
                <p>Selected: {selectedBatch}</p>
                <p>Success Rate: {batchAverages[selectedBatch]}%</p>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Panel */}
        <div className={styles.rightPanel}>
          <div className={styles.statsContainer}>
            {!selectedBatch ? (
              <OverallStats stats={selectedData} avg={overallAvg} />
            ) : (
              <BatchStats batchData={selectedData} batchAvg={batchAverages[selectedBatch]} />
            )}
            <SmallPieChart stats={selectedData} />
          </div>
        </div>
      </div>

      {/* Batch Comparison Chart */}
      <div className={styles.chartSection}>
        <h2>Batch-wise Comparison</h2>
        <BatchComparisonChart batches={data.batches} batchAverages={batchAverages} />
      </div>

      {/* Top Recruiters Section */}
      <div className={styles.topRecruitersSection}>
        <h2>
          <span role="img" aria-label="trophy">🏆</span> Top Recruiters
        </h2>
        
        <div className={styles.filterButtons}>
          {["all", "tech", "finance", "analytics"].map(type => (
            <button
              key={type}
              onClick={() => setSelectedRecruiterType(type)}
              className={selectedRecruiterType === type ? styles.activeButton : styles.inactiveButton}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.recruitersGrid}>
          {data.topRecruiters
            .filter(r => selectedRecruiterType === "all" || r.type === selectedRecruiterType)
            .map((recruiter, index) => (
              <div key={index} className={styles.recruiterCard}>
                <div className={styles.recruiterHeader}>
                  <div className={styles.recruiterLogo}>
                    <img 
                      src={recruiter.logo} 
                      alt={`${recruiter.name} logo`}
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "/logos/default-company.png";
                      }}
                    />
                  </div>
                  <h3>{recruiter.name}</h3>
                </div>
                <div className={styles.recruiterStats}>
                  <p>
                    <strong>Students Hired:</strong> {recruiter.studentsHired}
                  </p>
                  <p>
                    <strong>Avg Package:</strong> {recruiter.avgPackage}
                  </p>
                  <p>
                    <strong>Highest Package:</strong> {recruiter.highestPackage}
                  </p>
                  <p>
                    <strong>Consistency:</strong> {recruiter.consistency}
                  </p>
                  <div className={styles.roles}>
                    <strong>Roles:</strong>
                    <div className={styles.rolesTags}>
                      {recruiter.roles.map((role, i) => (
                        <span key={i} className={styles.roleTag}>
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// Stats Components
const OverallStats = ({ stats, avg }) => (
  <div className={styles.card}>
    <h2>Overall Statistics</h2>
    <div className={styles.statsGrid}>
      <div className={styles.statItem}>
        <label>Total Students</label>
        <p>{stats.total}</p>
      </div>
      <div className={styles.statItem}>
        <label>Placed Students</label>
        <p>{stats.placed}</p>
      </div>
      <div className={styles.statItem}>
        <label>Success Rate</label>
        <p>{avg}%</p>
      </div>
    </div>
  </div>
);

const BatchStats = ({ batchData, batchAvg }) => (
  <div className={styles.batchStats}>
    <h2>Batch Statistics ({batchAvg}%)</h2>
    <div className={styles.branchGrid}>
      {Object.entries(batchData).map(([branch, stats]) => (
        <div key={branch} className={styles.branchCard}>
          <h3>{branch}</h3>
          <div className={styles.branchStats}>
            <p>
              <strong>Total:</strong> {stats.total}
            </p>
            <p>
              <strong>Placed:</strong> {stats.placed}
            </p>
            <p>
              <strong>Success Rate:</strong>{" "}
              {((stats.placed / stats.total) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SmallPieChart = ({ stats }) => {
  let totalStudents, placedStudents;
  
  if (stats.total && stats.placed) {
    totalStudents = stats.total;
    placedStudents = stats.placed;
  } else {
    totalStudents = Object.values(stats).reduce((sum, branch) => sum + branch.total, 0);
    placedStudents = Object.values(stats).reduce((sum, branch) => sum + branch.placed, 0);
  }

  const chartData = {
    labels: ["Placed", "Unplaced"],
    datasets: [{
      data: [placedStudents, totalStudents - placedStudents],
      backgroundColor: ["#48bb78", "#fc8181"],
      borderColor: ["#38a169", "#f56565"],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20
        }
      }
    }
  };

  return (
    <div className={styles.pieChart}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

const BatchComparisonChart = ({ batches, batchAverages }) => {
  const labels = Object.keys(batches);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Placed Students",
        data: labels.map(batch =>
          Object.values(batches[batch]).reduce((sum, b) => sum + b.placed, 0)
        ),
        backgroundColor: "#4299e1",
        borderColor: "#3182ce",
        borderWidth: 1
      },
      {
        label: "Success Rate (%)",
        data: labels.map(batch => parseFloat(batchAverages[batch])),
        backgroundColor: "#48bb78",
        borderColor: "#38a169",
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)"
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20
        }
      }
    }
  };

  return (
    <div className={styles.batchComparisonChart}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Stats;