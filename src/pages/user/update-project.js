import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/UpdateProject.module.css";

const InputField = ({ name, type, placeholder, value, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={styles.inputField}
    required
  />
);

const TextAreaField = ({ name, placeholder, value, onChange }) => (
  <textarea
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={styles.textareaField}
    rows="3"
    required
  />
);

export default function UpdateProjects({ onClose }) {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("User"));
    if (storedUser?.email) {
      setUserEmail(storedUser.email);
      setProjects(storedUser.project || [{ title: "", skillused: "", date: "", description: "" }]);
    } else {
      setError("User not found. Please log in.");
    }
  }, []);

  const addProject = () => {
    setProjects([...projects, { title: "", skillused: "", date: "", description: "" }]);
  };

  const handleProjectChange = (e, index) => {
    const updatedProjects = [...projects];
    updatedProjects[index][e.target.name] = e.target.value;
    setProjects(updatedProjects);
  };

  const handleDelete = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/user/updateproject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, project: projects }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update projects");
      }

      const updatedData = await response.json();
      const storedUser = JSON.parse(localStorage.getItem("User"));
      storedUser.project = projects;
      localStorage.setItem("User", JSON.stringify(storedUser));

      if (onClose) {
        onClose();
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      router.push("/profile");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Projects</h2>
          <p className={styles.subtitle}>Showcase your work and skills</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {projects.map((proj, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.projectTitle}>Project #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className={styles.deleteButton}
                  aria-label="Delete project"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13H5v-2h14v2z" />
                  </svg>
                </button>
              </div>

              <div className={styles.inputGroup}>
                <InputField
                  name="title"
                  type="text"
                  placeholder="Project Title"
                  value={proj.title}
                  onChange={(e) => handleProjectChange(e, index)}
                />
                <InputField
                  name="skillused"
                  type="text"
                  placeholder="Skills Used (comma separated)"
                  value={proj.skillused}
                  onChange={(e) => handleProjectChange(e, index)}
                />
                <InputField
                  name="date"
                  type="text"
                  placeholder="Duration (e.g., Jan 2023 - Present)"
                  value={proj.date}
                  onChange={(e) => handleProjectChange(e, index)}
                />
                <TextAreaField
                  name="description"
                  placeholder="Project description, your contributions, and achievements..."
                  value={proj.description}
                  onChange={(e) => handleProjectChange(e, index)}
                />
              </div>
            </div>
          ))}

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={addProject}
              className={styles.addButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              Add Project
            </button>

            <div className={styles.actionButtons}>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner}></span>
                    Saving...
                  </>
                ) : (
                  "Save Projects"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}