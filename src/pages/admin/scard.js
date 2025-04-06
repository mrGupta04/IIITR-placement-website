import React from "react";
import styles from "../../styles/Scard.module.css";

const SCard = ({ student }) => {
  return (
    <div className={styles.card}>
      {student.profilepic && (
        <div className={styles.profilePicContainer}>
          <img
            src={student.profilepic}
            alt={`${student.name}'s profile`}
            className={styles.profilePic}
          />
        </div>
      )}
      <h3 className={styles.studentName}>{student.name}</h3>
      <p className={styles.info}>Email: {student.email}</p>
      <p className={styles.info}>Mobile: {student.mobileno}</p>
      <p className={styles.info}>City: {student.city}</p>
      <p className={styles.info}>Batch: {student.batch}</p>
      <p className={styles.info}>Roll Number: {student.rollno}</p>
      <p className={styles.info}>Department: {student.department}</p>
      <p className={styles.info}>CGPA: {student.cgpa}</p>
      <p className={styles.info}>Skills: {student.skills.join(", ")}</p>
      <p className={styles.info}>Gender: {student.gender}</p>
      {student.linkedin && (
        <p className={styles.info}>
          LinkedIn: <a href={student.linkedin} className={styles.link}>{student.linkedin}</a>
        </p>
      )}
      {student.github && (
        <p className={styles.info}>
          GitHub: <a href={student.github} className={styles.link}>{student.github}</a>
        </p>
      )}
      {student.leetcode && (
        <p className={styles.info}>
          LeetCode: <a href={student.leetcode} className={styles.link}>{student.leetcode}</a>
        </p>
      )}
      {student.portfolio && (
        <p className={styles.info}>
          Portfolio: <a href={student.portfolio} className={styles.link}>{student.portfolio}</a>
        </p>
      )}
      {student.preferredLocation && (
        <p className={styles.info}>Preferred Location: {student.preferredLocation}</p>
      )}
      {student.resume && (
        <p className={styles.info}>
          Resume: <a href={student.resume} className={styles.link}>Download</a>
        </p>
      )}
      {student.projects && student.projects.length > 0 && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Projects:</h4>
          <ul className={styles.list}>
            {student.projects.map((project, index) => (
              <li key={index} className={styles.listItem}>
                <strong>{project.title}</strong> - {project.skillused}
                <p>{project.description}</p>
                <p>Date: {new Date(project.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {student.workExperience && student.workExperience.length > 0 && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Work Experience:</h4>
          <ul className={styles.list}>
            {student.workExperience.map((work, index) => (
              <li key={index} className={styles.listItem}>
                <strong>{work.jobTitle}</strong> at {work.company}
                <p>{work.description}</p>
                <p>Duration: {work.duration}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {student.leadership && student.leadership.length > 0 && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Leadership:</h4>
          <ul className={styles.list}>
            {student.leadership.map((activity, index) => (
              <li key={index} className={styles.listItem}>
                <strong>{activity.role}</strong> - {activity.activity}
                <p>{activity.description}</p>
                <p>Duration: {activity.duration}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SCard;
