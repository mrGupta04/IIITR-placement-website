import React, { useState } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';
import styles from '../../styles/Viewstudents.module.css';
import SCard from './scard';

const cgpaOptions = [
  { value: '9', label: '9' },
  { value: '8', label: '8' },
  { value: '7', label: '7' },
  { value: '6', label: '6' },
  { value: '5', label: '5' },
];

const batchOptions = [
  { value: 'Batch 2025', label: '2025' },
  { value: 'Batch 2024', label: '2024' },
  { value: 'Batch 2023', label: '2023' },
  { value: 'Batch 2022', label: '2022' },
];

const departmentOptions = [
  { label: 'Computer Science', value: 'Computer Science' },
  { label: 'Electrical Engineering', value: 'Electrical Engineering' },
  { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
  { label: 'Civil Engineering', value: 'Civil Engineering' },
];

const skillOptions = [
  { value: 'Python', label: 'Python' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'React', label: 'React' },
  { value: 'SQL', label: 'SQL' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'AWS', label: 'AWS' },
  { value: 'Django', label: 'Django' },
  { value: 'C++', label: 'C++' },
  { value: 'Java', label: 'Java' },
];

const genderOptions = [
  { value: 'all', label: 'All' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const StudentForm = () => {
  const router = useRouter();
  const [selectedCGPA, setSelectedCGPA] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBackToProfile = () => {
    router.push('/admin/profile');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = {
      cgpa: selectedCGPA ? selectedCGPA.value : null,
      batch: selectedBatch ? selectedBatch.value : null,
      department: selectedDepartment ? selectedDepartment.value : null,
      skills: selectedSkills.map((skill) => skill.value),
      gender: selectedGender ? selectedGender.value : null,
    };

    try {
      const response = await fetch('/api/auth/admin/studentsdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && Array.isArray(data.students)) {
        setStudentData(data.students);
      } else {
        console.error('Expected an array but received:', data);
        setError('Unexpected data format received from the server.');
        setStudentData([]);
      }
    } catch (error) {
      console.error('Error fetching filtered students:', error);
      setError('Failed to fetch student data. Please try again later.');
      setStudentData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Student Search</h1>
        <p>Filter students by various criteria to find the best candidates</p>
      </div>

      <button 
        onClick={handleBackToProfile} 
        className={styles.backButton}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Profile
      </button>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.filterGrid}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Minimum CGPA</label>
            <Select
              options={cgpaOptions}
              value={selectedCGPA}
              onChange={setSelectedCGPA}
              isClearable
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select CGPA..."
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Batch</label>
            <Select
              options={batchOptions}
              value={selectedBatch}
              onChange={setSelectedBatch}
              isClearable
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select Batch..."
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Department</label>
            <Select
              options={departmentOptions}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              isClearable
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select Department..."
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Skills</label>
            <Select
              options={skillOptions}
              value={selectedSkills}
              onChange={setSelectedSkills}
              isMulti
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select Skills..."
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Gender</label>
            <Select
              options={genderOptions}
              value={selectedGender}
              onChange={setSelectedGender}
              isClearable
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select Gender..."
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? (
            <>
              <span className={styles.spinner}></span>
              Searching...
            </>
          ) : (
            'Search Students'
          )}
        </button>
      </form>

      {error && (
        <div className={styles.errorAlert}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className={styles.resultsContainer}>
        <h2 className={styles.resultsTitle}>
          {studentData.length > 0 ? `${studentData.length} Students Found` : 'Search Results'}
        </h2>
        
        {studentData.length > 0 ? (
          <div className={styles.studentsGrid}>
            {studentData.map((student) => (
              <SCard key={student.email} student={student} />
            ))}
          </div>
        ) : (
          !loading && (
            <div className={styles.emptyState}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3>No students found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StudentForm;