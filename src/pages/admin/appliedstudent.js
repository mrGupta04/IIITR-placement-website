import { useEffect, useState } from "react";

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (students.length === 0) return <p>No students have applied for this job.</p>;

    return (
        <div>
            <h3>Applied Students</h3>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>{student.name} - {student.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default AppliedStudents;
