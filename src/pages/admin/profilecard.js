import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import styles from '../../styles/Admin-profilecard.module.css';

const AdminProfileCard = ({ handleLogout }) => {
    const router = useRouter();
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const storedAdmin = JSON.parse(localStorage.getItem("admin")) || null;
        setAdminData(storedAdmin);
    }, []);

    const handleUpdate = () => {
        router.push("/admin/update");
    };

    const viewStudent = () => {
        router.push("/admin/viewstudent");
    };

    const handleJobcard = () => {
        router.push("/admin/jobs");
    };

    return (
        <div className={styles.adminProfileCard}>
            {adminData ? (
                <div className={styles.adminProfilecontent}>
                    <div className={styles.ProfilePicContainer}>
                        {adminData.profilePic ? (
                            <img src={adminData.profilePic} alt="Profile" className={styles.adminprofile} />
                        ) : (
                            <img src="https://via.placeholder.com/150" alt="Default Profile" className={styles.adminprofile} />
                        )}
                    </div>
                    <h3 className={styles.adminName}>{adminData.name || "N/A"}</h3>

                    <div className={styles.adminDetails}>
                        <p><strong>Email:</strong> {adminData.email || "N/A"}</p>
                        <p><strong>Mobile No:</strong> {adminData.mobileno || "N/A"}</p>
                        <p><strong>Company:</strong> {adminData.aboutCompany || "N/A"}</p>
                        <p><strong>Industry Type:</strong> {adminData.industryType || "N/A"}</p>
                        <p><strong>City:</strong> {adminData.city || "N/A"}</p>
                        <p><strong>State:</strong> {adminData.state || "N/A"}</p>
                        <p><strong>Admin ID:</strong> {adminData.id || "N/A"}</p>
                        <p><strong>Website:</strong> {adminData.website ? <a href={adminData.website} target="_blank" rel="noopener noreferrer">{adminData.website}</a> : "N/A"}</p>
                    </div>

                    <div className={styles.buttonContainer}>
                        <button onClick={handleJobcard} className={styles.button}>Jobs</button>
                        <button onClick={viewStudent} className={styles.button}>View Students</button>
                        <button onClick={handleUpdate} className={styles.button}>Update</button>
                        <button onClick={handleLogout} className={styles.button}>Logout</button>
                    </div>
                </div>
            ) : (
                <p>Loading admin profile...</p>
            )}
        </div>
    );
};

export default AdminProfileCard;
