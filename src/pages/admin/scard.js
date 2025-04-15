"use client"; // Add this for Next.js 13+ to ensure client-side rendering

import React from "react";
import styles from "../../styles/Scard.module.css";

const SCard = ({ student }) => {
  // Safely handle undefined/null student object
  if (!student) {
    return (
      <div className={styles.card}>
        <div className={styles.errorMessage}>No student data available</div>
      </div>
    );
  }

  // Safely extract properties with fallbacks
  const {
    profilepic = "",
    name = "Unknown Student",
    department = "Unknown Department",
    batch = "",
    cgpa = "N/A",
    email = "",
    mobileno = "",
    city = "",
    rollno = "",
    skills = [],
    linkedin = "",
    github = "",
    leetcode = "",
    portfolio = "",
    resume = "",
    projects = [],
    workExperience = [],
    leadership = []
  } = student || {};

  // Helper function to render initials
  const renderInitials = () => {
    if (!name) return "?";
    return name
      .split(" ")
      .map(n => n[0] || "")
      .join("")
      .toUpperCase();
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {profilepic ? (
          <img
            src={profilepic}
            alt={`${name}'s profile`}
            className={styles.profilePic}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : (
          <div className={styles.profilePlaceholder}>
            {renderInitials()}
          </div>
        )}
        <div className={styles.headerText}>
          <h3 className={styles.studentName}>{name}</h3>
          <p className={styles.studentTitle}>
            {department} {batch && `• ${batch}`}
          </p>
          <div className={styles.ratingBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>CGPA: {cgpa}</span>
          </div>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.infoGrid}>
          {email && (
            <div className={styles.infoItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#4f8ef7">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <a href={`mailto:${email}`} className={styles.link}>
                {email}
              </a>
            </div>
          )}

          {mobileno && (
            <div className={styles.infoItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#4f8ef7">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
              <a href={`tel:${mobileno}`} className={styles.link}>
                {mobileno}
              </a>
            </div>
          )}

          {city && (
            <div className={styles.infoItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#4f8ef7">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>{city}</span>
            </div>
          )}

          {rollno && (
            <div className={styles.infoItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#4f8ef7">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
              <span>Roll No: {rollno}</span>
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className={styles.skillsSection}>
            <h4 className={styles.sectionTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#4f8ef7">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              Skills
            </h4>
            <div className={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <span key={index} className={styles.skillPill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {(linkedin || github || leetcode || portfolio) && (
          <div className={styles.socialLinks}>
            <h4 className={styles.sectionTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#4f8ef7">
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
              </svg>
              Social Links
            </h4>
            <div className={styles.linkContainer}>
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077B5">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  LinkedIn
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#333">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  GitHub
                </a>
              )}
              {leetcode && (
                <a href={leetcode} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFA116">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 14.445.439 1.374 1.374 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                  LeetCode
                </a>
              )}
              {portfolio && (
                <a href={portfolio} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4f8ef7">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                  </svg>
                  Portfolio
                </a>
              )}
            </div>
          </div>
        )}

        {resume && (
          <div className={styles.resumeSection}>
            <a href={resume} target="_blank" rel="noopener noreferrer" className={styles.resumeButton}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#4f8ef7">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
              Download Resume
            </a>
          </div>
        )}
      </div>

      {(projects.length > 0 || workExperience.length > 0 || leadership.length > 0) && (
        <div className={styles.cardFooter}>
          {projects.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#4f8ef7">
                  <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
                </svg>
                Projects
              </h4>
              <div className={styles.list}>
                {projects.map((project, index) => (
                  <div key={index} className={styles.listItem}>
                    <h5 className={styles.itemTitle}>{project.title || "Untitled Project"}</h5>
                    <p className={styles.itemSubtitle}>
                      {project.skillused && (
                        <span className={styles.itemSkill}>{project.skillused}</span>
                      )}
                      {project.date && (
                        <span className={styles.itemDate}>
                          {new Date(project.date).toLocaleDateString()}
                        </span>
                      )}
                    </p>
                    {project.description && (
                      <p className={styles.itemDescription}>{project.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {workExperience.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#4f8ef7">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                </svg>
                Work Experience
              </h4>
              <div className={styles.list}>
                {workExperience.map((work, index) => (
                  <div key={index} className={styles.listItem}>
                    <h5 className={styles.itemTitle}>
                      {work.jobTitle || "Position"} {work.company && `at ${work.company}`}
                    </h5>
                    {work.duration && (
                      <p className={styles.itemSubtitle}>
                        <span className={styles.itemDuration}>{work.duration}</span>
                      </p>
                    )}
                    {work.description && (
                      <p className={styles.itemDescription}>{work.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {leadership.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#4f8ef7">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
                Leadership
              </h4>
              <div className={styles.list}>
                {leadership.map((activity, index) => (
                  <div key={index} className={styles.listItem}>
                    <h5 className={styles.itemTitle}>
                      {activity.role || "Role"} {activity.activity && `- ${activity.activity}`}
                    </h5>
                    {activity.duration && (
                      <p className={styles.itemSubtitle}>
                        <span className={styles.itemDuration}>{activity.duration}</span>
                      </p>
                    )}
                    {activity.description && (
                      <p className={styles.itemDescription}>{activity.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SCard;