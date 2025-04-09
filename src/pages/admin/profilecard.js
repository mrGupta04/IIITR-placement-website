import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import styles from '../../styles/Admin-profilecard.module.css';

const AdminProfileCard = ({ handleLogout }) => {
    const router = useRouter();
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch delay for demo
        setTimeout(() => {
            const storedAdmin = JSON.parse(localStorage.getItem("admin")) || null;
            setAdminData(storedAdmin);
            setLoading(false);
        }, 800);
    }, []);

    const handleUpdate = () => router.push("/admin/update");
    const viewStudent = () => router.push("/admin/viewstudent");
    const handleJobcard = () => router.push("/admin/jobs");

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.waveLoader}></div>
                <p>Loading your profile...</p>
            </div>
        );
    }

    return (
        <div className={styles.profileDashboard}>
            {adminData ? (
                <>
                    <div className={styles.profileHeader}>
                        <div className={styles.avatarContainer}>
                            {adminData.profilePic ? (
                                <img 
                                    src={adminData.profilePic} 
                                    alt="Profile" 
                                    className={styles.avatar}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/default-avatar.png";
                                    }}
                                />
                            ) : (
                                <div className={styles.avatarPlaceholder}>
                                    {adminData.name 
                                        ? adminData.name.split(' ').map(n => n[0]).join('') 
                                        : 'AD'}
                                </div>
                            )}
                            <div className={styles.verificationBadge} title="Verified Admin">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
                                </svg>
                            </div>
                        </div>
                        <div className={styles.profileTitles}>
                            <h1>{adminData.name || "Admin User"}</h1>
                            <p className={styles.roleTag}>Administrator</p>
                        </div>
                    </div>

                    <div className={styles.profileGrid}>
                        <div className={styles.profileCard}>
                            <h3 className={styles.cardTitle}>
                                <svg viewBox="0 0 24 24" width="20" height="20" className={styles.cardIcon}>
                                    <path fill="currentColor" d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"/>
                                </svg>
                                Personal Information
                            </h3>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <label>Email</label>
                                    <p>{adminData.email || "—"}</p>
                                </div>
                                <div className={styles.infoItem}>
                                    <label>Phone</label>
                                    <p>{adminData.mobileno || "—"}</p>
                                </div>
                               
                            </div>
                        </div>

                        <div className={styles.profileCard}>
                            <h3 className={styles.cardTitle}>
                                <svg viewBox="0 0 24 24" width="20" height="20" className={styles.cardIcon}>
                                    <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                                    <path fill="currentColor" d="M7 12h2v5H7zm4-7h2v12h-2zm4 5h2v7h-2z"/>
                                </svg>
                                Company Information
                            </h3>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <label>Company</label>
                                    <p>{adminData.aboutCompany || "—"}</p>
                                </div>
                                <div className={styles.infoItem}>
                                    <label>Industry</label>
                                    <p>{adminData.industryType || "—"}</p>
                                </div>
                                <div className={styles.infoItem}>
                                    <label>Location</label>
                                    <p>
                                        {[adminData.city, adminData.state].filter(Boolean).join(", ") || "—"}
                                    </p>
                                </div>
                                {adminData.website && (
                                    <div className={styles.infoItem}>
                                        <label>Website</label>
                                        <a 
                                            href={
                                                adminData.website.startsWith("http") 
                                                    ? adminData.website 
                                                    : `https://${adminData.website}`
                                            } 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            {adminData.website.replace(/^https?:\/\//, '')}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.actionPanel}>
                        <button onClick={handleJobcard} className={styles.actionButton}>
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="currentColor" d="M10 2h4a2 2 0 012 2v2h4a2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V8c0-1.11.89-2 2-2h4V4c0-1.11.89-2 2-2m4 4V4h-4v2h4z"/>
                            </svg>
                            Manage Jobs
                        </button>
                        <button onClick={viewStudent} className={styles.actionButton}>
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="currentColor" d="M12 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3m0 14.2c2.5 0 4.71-1.28 6-3.22-.03-1.99-4-3.08-6-3.08-1.99 0-5.97 1.09-6 3.08 1.29 1.94 3.5 3.22 6 3.22z"/>
                            </svg>
                            View Students
                        </button>
                        <button onClick={handleUpdate} className={styles.actionButton}>
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z"/>
                            </svg>
                            Update Profile
                        </button>
                        <button onClick={handleLogout} className={`${styles.actionButton} ${styles.logoutButton}`}>
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="currentColor" d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z"/>
                            </svg>
                            Logout
                        </button>
                    </div>
                </>
            ) : (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIllustration}>
                        <svg viewBox="0 0 24 24" width="80" height="80">
                            <path fill="#e0e0e0" d="M12 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3m0 14.2c2.5 0 4.71-1.28 6-3.22-.03-1.99-4-3.08-6-3.08-1.99 0-5.97 1.09-6 3.08 1.29 1.94 3.5 3.22 6 3.22z"/>
                            <path fill="#e0e0e0" d="M16.5 12c0 1.5-.5 3-1.5 4.5V20h1v1H8v-1h1v-3.5c-1-1.5-1.5-3-1.5-4.5C7.5 10 10 7 12 7s4.5 3 4.5 5z"/>
                        </svg>
                    </div>
                    <h3>No Admin Data Found</h3>
                    <p>Please log in to access your admin profile</p>
                </div>
            )}
        </div>
    );
};

export default AdminProfileCard;