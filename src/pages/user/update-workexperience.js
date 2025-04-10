import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/UpdateWorkExperience.module.css";

export default function UpdateProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (user?.projects) {
      setProjects(user.projects);
    } else {
      setProjects([{ 
        title: "", 
        skills: "", 
        date: "", 
        description: "",
        link: "" 
      }]);
    }
  }, []);

  const addProject = () => {
    setProjects([...projects, { 
      title: "", 
      skills: "", 
      date: "", 
      description: "",
      link: ""
    }]);
  };

  const handleChange = (e, index) => {
    const updatedProjects = [...projects];
    updatedProjects[index][e.target.name] = e.target.value;
    setProjects(updatedProjects);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const user = JSON.parse(localStorage.getItem("User"));
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: user.email, 
          projects 
        }),
      });

      if (!response.ok) throw new Error("Update failed");
      
      const data = await response.json();
      localStorage.setItem("User", JSON.stringify(data.user));
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1>Update Your Projects</h1>
          <p>Showcase your best work to potential employers</p>
        </header>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.cardHeader}>
                <h3>Project {index + 1}</h3>
                <button 
                  type="button" 
                  onClick={() => removeProject(index)}
                  className={styles.deleteBtn}
                  aria-label="Remove project"
                >
                  ×
                </button>
              </div>

              <div className={styles.formGroup}>
                <label>Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={project.title}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="My Awesome Project"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Skills Used</label>
                <input
                  type="text"
                  name="skills"
                  value={project.skills}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="React, Node.js, MongoDB"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Project Date</label>
                <input
                  type="text"
                  name="date"
                  value={project.date}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Jan 2023 - Present"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Project Link</label>
                <input
                  type="url"
                  name="link"
                  value={project.link}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="https://myproject.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={project.description}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Describe what you built and your contributions..."
                  rows={4}
                  required
                />
              </div>
            </div>
          ))}

          <div className={styles.actions}>
            <button 
              type="button" 
              onClick={addProject}
              className={styles.secondaryBtn}
            >
              + Add Another Project
            </button>
            
            <div className={styles.mainActions}>
              <button 
                type="button" 
                onClick={() => router.back()}
                className={styles.outlineBtn}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className={styles.primaryBtn}
              >
                {loading ? "Saving..." : "Save Projects"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}