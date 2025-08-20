import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/ProfileCard.module.css";

const ProfileCard = ({ user, handleLogout }) => {
  const router = useRouter();
  const [update, setUpdate] = useState(false);
  const [userData, setUserData] = useState(user || {});

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleUpdate = () => {
    setUpdate(true);
    router.push("/user/update");
  };

  const handleUpdateSuccess = (updatedUser) => {
    if (updatedUser) {
      setUserData(updatedUser);
      localStorage.setItem("User", JSON.stringify(updatedUser));
    }
    setUpdate(false);
  };

  // ✅ Navigate to Jobs page
  const handleViewJobs = () => {
    router.push("/jobs");
  };

  return (
    <div className={styles.profileContainer}>
      {userData && Object.keys(userData).length > 0 ? (
        <div className={styles.profileGrid}>
          {/* Profile Header Section */}
          <div className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              {userData.profilepic ? (
                <img
                  src={userData.profilepic}
                  alt="Profile"
                  className={styles.profileImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />
              ) : (
                <div className={styles.profileInitials}>
                  {userData.name ? userData.name.charAt(0).toUpperCase() : "?"}
                </div>
              )}
            </div>

            <div className={styles.profileInfo}>
              <h1 className={styles.profileName}>
                {userData.name || "Not Provided"}
              </h1>
              <div className={styles.profileMeta}>
                {userData.department && (
                  <span className={styles.metaItem}>{userData.department}</span>
                )}
                {userData.batch && (
                  <span className={styles.metaItem}>Batch: {userData.batch}</span>
                )}
                {userData.cgpa && (
                  <span className={styles.metaItem}>CGPA: {userData.cgpa}</span>
                )}
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.updateButton} onClick={handleUpdate}>
                <i className="fas fa-edit"></i> Edit Profile
              </button>
              <button className={styles.logoutButton} onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
              {/* ✅ View Jobs Button */}
              <button className={styles.jobsButton} onClick={handleViewJobs}>
                <i className="fas fa-briefcase"></i> View Jobs
              </button>
            </div>
          </div>

          {/* Personal Details Section */}
          <div className={styles.profileSection}>
            <h2 className={styles.sectionTitle}>Personal Details</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Mobile:</span>
                <span>{userData.mobileno || "Not Provided"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Roll No:</span>
                <span>{userData.rollno || "Not Provided"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Gender:</span>
                <span>{userData.gender || "Not Provided"}</span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          {userData.skills?.length > 0 && (
            <div className={styles.profileSection}>
              <h2 className={styles.sectionTitle}>Skills</h2>
              <div className={styles.skillsContainer}>
                {userData.skills.map((skill, index) => (
                  <span key={index} className={styles.skillPill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Resume Section */}
          <div className={styles.profileSection}>
            <h2 className={styles.sectionTitle}>Resume</h2>
            {userData.resume ? (
              <a
                href={userData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.resumeLink}
              >
                <i className="fas fa-file-pdf"></i> View Resume
              </a>
            ) : (
              <p className={styles.noContent}>No resume uploaded</p>
            )}
          </div>

          {/* Social Links */}
          {(userData.leetcode || userData.github || userData.linkedin) && (
            <div className={styles.profileSection}>
              <h2 className={styles.sectionTitle}>Social Profiles</h2>
              <div className={styles.socialLinks}>
                {userData.github && (
                  <a
                    href={userData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <i className="fab fa-github"></i> GitHub
                  </a>
                )}
                {userData.linkedin && (
                  <a
                    href={userData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <i className="fab fa-linkedin"></i> LinkedIn
                  </a>
                )}
                {userData.leetcode && (
                  <a
                    href={userData.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <i className="fas fa-code"></i> LeetCode
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {userData.project?.length > 0 && (
            <div className={styles.profileSection}>
              <h2 className={styles.sectionTitle}>Projects</h2>
              <div className={styles.cardContainer}>
                {userData.project.map((proj, index) => (
                  <div key={index} className={styles.card}>
                    <h3 className={styles.cardTitle}>
                      {proj.Title || "Untitled Project"}
                    </h3>
                    {proj.skillused && (
                      <div className={styles.cardSkills}>
                        {proj.skillused.split(",").map((skill, i) => (
                          <span key={i} className={styles.cardSkillPill}>
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    {proj.description && (
                      <p className={styles.cardText}>{proj.description}</p>
                    )}
                    {proj.date && (
                      <p className={styles.cardDate}>{proj.date}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience Section */}
          {userData.workExperience?.length > 0 && (
            <div className={styles.profileSection}>
              <h2 className={styles.sectionTitle}>Work Experience</h2>
              <div className={styles.timeline}>
                {userData.workExperience.map((exp, index) => (
                  <div key={index} className={styles.timelineItem}>
                    <div className={styles.timelineDot}></div>
                    <div className={styles.timelineContent}>
                      <h3 className={styles.timelineTitle}>
                        {exp.jobTitle || "Untitled Position"}
                      </h3>
                      <p className={styles.timelineCompany}>
                        {exp.company || "Unknown Company"}
                      </p>
                      {exp.duration && (
                        <p className={styles.timelineDuration}>{exp.duration}</p>
                      )}
                      {exp.description && (
                        <p className={styles.timelineDescription}>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leadership Section */}
          {userData.leadership?.length > 0 && (
            <div className={styles.profileSection}>
              <h2 className={styles.sectionTitle}>Leadership</h2>
              <div className={styles.cardContainer}>
                {userData.leadership.map((lead, index) => (
                  <div key={index} className={styles.card}>
                    <h3 className={styles.cardTitle}>
                      {lead.activity || "Leadership Activity"}
                    </h3>
                    <p className={styles.cardSubtitle}>
                      {lead.role || "Role not specified"}
                    </p>
                    {lead.duration && (
                      <p className={styles.cardDate}>{lead.duration}</p>
                    )}
                    {lead.description && (
                      <p className={styles.cardText}>{lead.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading profile...</p>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
