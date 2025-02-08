import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from '../../styles/ProfileCard.module.css';

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

  return (
    <div className={styles.profilecard}>
      {userData && Object.keys(userData).length > 0 ? (
        <>

          <div className={styles.profilepicsection}> <div>
            {userData.profilepic ? (
              <img src={userData.profilepic} alt="Profile" className="profile-img" />
            ) : (
              <p>No profile picture available</p>
            )}
          </div>
            <p><strong>Name:</strong> {userData.name || "Not Provided"}</p>

            <div>
              {userData.resume ? (
                <a href={userData.resume} target="_blank" rel="noopener noreferrer">
                  <button>View Resume</button>
                </a>
              ) : (
                <p>No resume uploaded</p>
              )}
            </div></div>
          <div className={styles.linksection}> <p><strong>LeetCode:</strong> {userData.leetcode ? <a href={userData.leetcode} target="_blank" rel="noopener noreferrer">{userData.leetcode}</a> : "Not Provided"}</p>
            <p><strong>GitHub:</strong> {userData.github ? <a href={userData.github} target="_blank" rel="noopener noreferrer">{userData.github}</a> : "Not Provided"}</p>
            <p><strong>LinkedIn:</strong> {userData.linkedin ? <a href={userData.linkedin} target="_blank" rel="noopener noreferrer">{userData.linkedin}</a> : "Not Provided"}</p></div>
          <div className={styles.personaldetail}>

            <p><strong>Mobile No:</strong> {userData.mobileno || "Not Provided"}</p>
            <p><strong>Batch:</strong> {userData.batch || "Not Provided"}</p>
            <p><strong>Roll No:</strong> {userData.rollno || "Not Provided"}</p>
            <p><strong>Department:</strong> {userData.department || "Not Provided"}</p>
            <p><strong>CGPA:</strong> {userData.cgpa || "Not Provided"}</p>
            <p><strong>Gender:</strong> {userData.gender || "Not Provided"}</p>
            <p><strong>Skills:</strong> {userData.skills?.length ? userData.skills.join(", ") : "Not Provided"}</p>
          </div>

          <div className={styles.project}> <p><strong>Projects:</strong></p>
            {userData.project?.length ? (
              <ul>
                {userData.project.map((proj, index) => (
                  <li key={index}>
                    <p><strong>Title:</strong> {proj.Title || "N/A"}</p>
                    <p><strong>Skills Used:</strong> {proj.skillused || "N/A"}</p>
                    <p><strong>Description:</strong> {proj.description || "N/A"}</p>
                    <p><strong>Date:</strong> {proj.date || "N/A"}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Not Provided</p>
            )}
          </div>
          {/* Work Experience */}
          <div className={styles.workexperience}> <p><strong>Work Experience:</strong></p>
            {userData.workExperience?.length ? (
              <ul>
                {userData.workExperience.map((exp, index) => (
                  <li key={index}>
                    <p><strong>Company:</strong> {exp.company || "N/A"}</p>
                    <p><strong>Job Title:</strong> {exp.jobTitle || "N/A"}</p>
                    <p><strong>Duration:</strong> {exp.duration || "N/A"}</p>
                    <p><strong>Description:</strong> {exp.description || "N/A"}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Not Provided</p>
            )}</div>

          {/* Leadership */}
          <div className={styles.leadership}> <p><strong>Leadership:</strong></p>
            {userData.leadership?.length ? (
              <ul>
                {userData.leadership.map((lead, index) => (
                  <li key={index}>
                    <p><strong>Activity:</strong> {lead.activity || "N/A"}</p>
                    <p><strong>Role:</strong> {lead.role || "N/A"}</p>
                    <p><strong>Duration:</strong> {lead.duration || "N/A"}</p>
                    <p><strong>Description:</strong> {lead.description || "N/A"}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Not Provided</p>
            )}
          </div>
          {/* Links */}


          {/* Buttons */}
          <button className={styles.button} onClick={handleUpdate}>Update</button>
          <button className={`${styles.button} ${styles["logout-btn"]}`} onClick={handleLogout}>Logout</button>

          {/* Update Form */}
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default ProfileCard;
