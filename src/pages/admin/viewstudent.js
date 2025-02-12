import React, { useState } from 'react';
import Select from 'react-select';
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
  const [selectedCGPA, setSelectedCGPA] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [studentData, setStudentData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      console.log(data);

      // Ensure data.students is an array before setting it to state
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
    <>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.dropdownContainer}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Minimum CGPA:</label>
            <Select
              options={cgpaOptions}
              value={selectedCGPA}
              onChange={setSelectedCGPA}
              isClearable
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Batch:</label>
            <Select
              options={batchOptions}
              value={selectedBatch}
              onChange={setSelectedBatch}
              isClearable
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Department:</label>
            <Select
              options={departmentOptions}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              isClearable
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Skills:</label>
            <Select
              options={skillOptions}
              value={selectedSkills}
              onChange={setSelectedSkills}
              isMulti
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Gender:</label>
            <Select
              options={genderOptions}
              value={selectedGender}
              onChange={setSelectedGender}
              isClearable
            />
          </div>
        </div>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.cardContainer}>
        {studentData.length > 0 ? (
          studentData.map((student) => (
            <SCard key={student.email} student={student} />
          ))
        ) : (
          !loading && <p>No students found.</p>
        )}
      </div>
    </>
  );
};

export default StudentForm;
