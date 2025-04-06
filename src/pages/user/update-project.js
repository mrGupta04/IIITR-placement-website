import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/UpdateProject.module.css"; // Importing CSS Module

const InputField = ({ name, type, placeholder, value, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={styles.inputField} // Applying module CSS class
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
        throw new Error(errorData.message || "Failed to update project");
      }

      const updatedData = await response.json();
      const storedUser = JSON.parse(localStorage.getItem("User"));
      storedUser.project = projects;
      localStorage.setItem("User", JSON.stringify(storedUser));

      alert("Projects updated successfully!");
      router.push("/user/update");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.heading}>Update Projects</h2>
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {projects.map((proj, index) => (
          <div key={index} className={styles.projectEntry}>
            <InputField
              name="title"
              type="text"
              placeholder="Project title"
              value={proj.title}
              onChange={(e) => handleProjectChange(e, index)}
            />
            <InputField
              name="skillused"
              type="text"
              placeholder="Skills Used"
              value={proj.skillused}
              onChange={(e) => handleProjectChange(e, index)}
            />
            <InputField
              name="date"
              type="text"
              placeholder="Start-End Date"
              value={proj.date}
              onChange={(e) => handleProjectChange(e, index)}
            />
            <InputField
              name="description"
              type="text"
              placeholder="Description"
              value={proj.description}
              onChange={(e) => handleProjectChange(e, index)}
            />

            <button type="button" onClick={() => handleDelete(index)} className={styles.deleteButton}>
              Delete
            </button>
          </div>
        ))}

        <button type="button" onClick={addProject} className={styles.addProjectButton}>
          Add New Project
        </button>
        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
