import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UpdateProjects from "./update-project";
import UpdateLeadership from "./update-leadership";
import UpdateWorkExperience from "./update-workexperience";
import styles from "../../styles/Userprofileupdate.module.css";

export default function Update({ onUpdateSuccess }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileno: "",
    batch: "",
    rollno: "",
    department: "",
    cgpa: "",
    linkedin: "",
    github: "",
    leetcode: "",
    preferredLocation: "",
    jobType: "",
    projects: [],
    skills: [],
    leadership: "",
    workExperience: [],
  });

  const [profilepic, setProfilepic] = useState(null);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        ...user,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.name === "profilepic") setProfilepic(file);
    if (e.target.name === "resume") setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email) {
      setError("User email is required!");
      setLoading(false);
      return;
    }

    const updateFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) updateFormData.append(key, formData[key]);
    });

    if (profilepic) updateFormData.append("profilepic", profilepic);
    if (resume) updateFormData.append("resume", resume);

    try {
      const res = await fetch("/api/auth/user/update", {
        method: "POST",
        body: updateFormData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed.");

      localStorage.setItem("User", JSON.stringify(data.user));
      

      if (onUpdateSuccess) {
        onUpdateSuccess(data.user);
      }

      router.back();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "projects":
        return <UpdateProjects onCancel={() => setActiveSection("personal")} />;
      case "leadership":
        return <UpdateLeadership onCancel={() => setActiveSection("personal")} />;
      case "work":
        return <UpdateWorkExperience onCancel={() => setActiveSection("personal")} />;
      default:
        return (
          <>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <form onSubmit={handleSubmit} className={styles.personalForm}>
              <div className={styles.formGrid}>
                {[
                  { label: "Name", name: "name" },
                  { label: "Mobile No", name: "mobileno" },
                  { label: "Batch", name: "batch" },
                  { label: "Roll No", name: "rollno" },
                  { label: "Department", name: "department" },
                  { label: "CGPA", name: "cgpa" },
                  { label: "LinkedIn", name: "linkedin" },
                  { label: "GitHub", name: "github" },
                  { label: "LeetCode", name: "leetcode" },
                  { label: "Preferred Location", name: "preferredLocation" },
                  { label: "Job Type", name: "jobType" },
                ].map(({ label, name, type = "text" }) => (
                  <div className={styles.formGroup} key={name}>
                    <label className={styles.inputLabel}>{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className={styles.formInput}
                    />
                  </div>
                ))}
              </div>

              <div className={styles.fileUploadGroup}>
                <div className={styles.fileUpload}>
                  <label className={styles.fileUploadLabel}>
                    <span>Profile Picture</span>
                    <input
                      type="file"
                      name="profilepic"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={styles.fileInput}
                    />
                    <span className={styles.fileUploadButton}>Choose File</span>
                    {profilepic && <span className={styles.fileName}>{profilepic.name}</span>}
                  </label>
                </div>

                <div className={styles.fileUpload}>
                  <label className={styles.fileUploadLabel}>
                    <span>Resume (PDF)</span>
                    <input
                      type="file"
                      name="resume"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className={styles.fileInput}
                    />
                    <span className={styles.fileUploadButton}>Choose File</span>
                    {resume && <span className={styles.fileName}>{resume.name}</span>}
                  </label>
                </div>
              </div>

              <button type="submit" disabled={loading} className={styles.submitButton}>
                {loading ? (
                  <>
                    <span className={styles.spinner}></span> Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </>
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div 
          className={`${styles.sidebarItem} ${activeSection === "personal" ? styles.active : ""}`}
          onClick={() => setActiveSection("personal")}
        >
          <span className={styles.icon}>👤</span>
          <span>Personal Info</span>
        </div>
        <div 
          className={`${styles.sidebarItem} ${activeSection === "projects" ? styles.active : ""}`}
          onClick={() => setActiveSection("projects")}
        >
          <span className={styles.icon}>📁</span>
          <span>Projects</span>
        </div>
        <div 
          className={`${styles.sidebarItem} ${activeSection === "leadership" ? styles.active : ""}`}
          onClick={() => setActiveSection("leadership")}
        >
          <span className={styles.icon}>🌟</span>
          <span>Leadership</span>
        </div>
        <div 
          className={`${styles.sidebarItem} ${activeSection === "work" ? styles.active : ""}`}
          onClick={() => setActiveSection("work")}
        >
          <span className={styles.icon}>💼</span>
          <span>Work Experience</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        {renderSection()}
      </div>
    </div>
  );
}