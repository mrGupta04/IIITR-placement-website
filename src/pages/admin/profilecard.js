import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import styles from '../../styles/Admin-profilecard.module.css';


const AdminProfileCard = ({ handleLogout }) => {
    const router = useRouter();

    const [update, setUpdate] = useState(false);
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        // Fetch updated admin data from localStorage when component mounts
        const storedAdmin = JSON.parse(localStorage.getItem("admin")) || null;
        setAdminData(storedAdmin);
    }, []);

    const handleUpdate = () => {
        setUpdate(true);
        router.push("/admin/update");
    };
    const viewStudent = () => {
        router.push("/admin/appliedjob");

    };

    const handleUpdateSuccess = (updatedAdmin) => {
        if (updatedAdmin) {
            setAdminData(updatedAdmin);
            localStorage.setItem("Admin", JSON.stringify(updatedAdmin)); // Update localStorage
        }
        setUpdate(false);
        router.push("/admin/profile"); // Redirect after update
    };
    const handleJobcard = () => {
        router.push("/admin/jobs");

    };

    return (
        <div className={styles.adminprofilecard}>
            {adminData ? (
                <div className={styles.adminprofilecontent}>
                    {/* Left Side: Profile Picture and Name */}
                    <div className={styles.admindataprofilepic}>
                        <div className={styles.adminprofilepicinside}>
                            {adminData.profilepic ? (
                                <img src={adminData.profilepic} alt="Profile" className={styles.adminprofile} />
                            ) : (
                                <img src="https://via.placeholder.com/150" alt="Default Profile" className={styles.adminprofile} />
                            )}
                        </div>
                        <h3 className={styles.adminname}>{adminData.name || "N/A"}</h3>
                    </div>

                    {/* Admin Details */}
                    <div className={styles.admindetail}>
                        <p><strong>Email:</strong> {adminData.email || "N/A"}</p>
                        <p><strong>Mobile No:</strong> {adminData.mobileno || "N/A"}</p>
                        <p><strong>Company:</strong> {adminData.aboutCompany || "N/A"}</p>
                        <p><strong>Industry Type:</strong> {adminData.industryType || "N/A"}</p>
                        <p><strong>City:</strong> {adminData.city || "N/A"}</p>
                        <p><strong>State:</strong> {adminData.state || "N/A"}</p>
                        <p><strong>Admin ID:</strong> {adminData.id || "N/A"}</p>
                        <p><strong>Website:</strong> {adminData.website ? <a href={adminData.website} target="_blank" rel="noopener noreferrer">{adminData.website}</a> : "N/A"}</p>
                    </div>

                    <button onClick={(handleJobcard)}>Jobs</button>
                    <button onClick={viewStudent}> View Students</button>
                    <button onClick={handleUpdate} className={styles.adminprofileupdatebutton}>Update</button>
                    <button onClick={handleLogout} className={styles.adminprofilelogoutbutton}>Logout</button>

                </div>
            ) : (
                <p>Loading admin profile...</p>
            )}
        </div>
    );
};

export default AdminProfileCard;
