import { useEffect, useState } from "react";
import styles from '../../styles/AppliedStudents.module.css';
import SCard from './scard';

const AppliedStudents = ({ jobId }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!jobId) return;

        const fetchAppliedStudents = async () => {
            try {
                const response = await fetch(`/api/applied-students?jobId=${jobId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch applied students");
                }
                const data = await response.json();
                setStudents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppliedStudents();
    }, [jobId]);

    if (loading) return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading applicants...</p>
        </div>
    );
    
    if (error) return (
        <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>Error: {error}</p>
        </div>
    );
    
    if (students.length === 0) return (
        <div className={styles.emptyState}>
            <img src="/images/no-applicants.svg" alt="No applicants" className={styles.emptyImage} />
            <h3>No applicants yet</h3>
            <p>Students who apply will appear here.</p>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Job Applicants</h2>
                <span className={styles.badge}>{students.length} applicant{students.length !== 1 ? 's' : ''}</span>
            </div>
            
            <div className={styles.grid}>
                {students.map((student) => (
                    <SCard 
                        key={student.id} 
                        student={student} 
                        className={styles.card}
                    />
                ))}
            </div>
        </div>
    );
};

export default AppliedStudents;