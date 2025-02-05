import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/UpdateWorkExperience.module.css"; // Import CSS module

// InputField component (Reusable Input)
const InputField = ({ name, type, placeholder, value, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={styles.inputField}
  />
);

export default function UpdateWorkExperience() {
  const router = useRouter();

  // Initialize work experience state
  const [workExperience, setWorkExperience] = useState([]);
  const [loading, setLoading] = useState(false); // For handling loading state

  // Load user data from localStorage or from API
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("User"));
    if (userData?.workExperience) {
      setWorkExperience(userData.workExperience);
    } else {
      loadWorkExperienceData();
    }
  }, []);

  // Function to load work experience data from API
  const loadWorkExperienceData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/work-experience");
      setWorkExperience(response.data || []);
    } catch (error) {
      console.error("Error loading work experience data", error);
    } finally {
      setLoading(false);
    }
  };

  // Add new work experience
  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      { company: "", jobTitle: "", duration: "", description: "" },
    ]);
  };

  // Handle change in any work experience field
  const handleWorkExperienceChange = (e, index) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index][e.target.name] = e.target.value;
    setWorkExperience(updatedExperience);
  };

  // Delete work experience entry
  const handleDelete = (index) => {
    setWorkExperience(workExperience.filter((_, i) => i !== index));
  };

  // Cancel and go back
  const handleCancel = () => {
    router.back();
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const email = JSON.parse(localStorage.getItem("User"))?.email;
      if (!email) throw new Error("User not found");

      const response = await axios.post("/api/auth/user/updateworkexperience", {
        email,
        workExperience,
      });

      if (response.status === 200) {
        const userData = JSON.parse(localStorage.getItem("User"));
        userData.workExperience = workExperience;
        localStorage.setItem("User", JSON.stringify(userData));
        router.push("/update");
      }
    } catch (error) {
      console.error("Error updating work experience", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.heading}>Update Work Experience</h2>
      {loading ? (
        <p className={styles.loadingText}>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          {workExperience.map((exp, index) => (
            <div key={index} className={styles.workExperienceEntry}>
              <InputField
                name="company"
                type="text"
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) => handleWorkExperienceChange(e, index)}
              />
              <InputField
                name="jobTitle"
                type="text"
                placeholder="Job Title"
                value={exp.jobTitle}
                onChange={(e) => handleWorkExperienceChange(e, index)}
              />
              <InputField
                name="duration"
                type="text"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => handleWorkExperienceChange(e, index)}
              />
              <InputField
                name="description"
                type="text"
                placeholder="Job Description"
                value={exp.description}
                onChange={(e) => handleWorkExperienceChange(e, index)}
              />

              <button
                type="button"
                onClick={() => handleDelete(index)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addWorkExperience}
            className={styles.addButton}
          >
            Add New Work Experience
          </button>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
            <button type="button" onClick={handleCancel} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
