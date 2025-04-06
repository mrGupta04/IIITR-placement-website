import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UpdateProjects from "./update-project";
import UpdateLeadership from "./update-leadership";
import UpdateWorkExperience from "./update-workexperience";

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

  const [showProjects, setShowProjects] = useState(false);
  const [showLeadership, setShowLeadership] = useState(false);
  const [showWorkExperience, setShowWorkExperience] = useState(false);

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

  return (
    <div className="update-page-container">
      <div className="update-box-container">
        <h2 className="update-heading">Update Account</h2>
        {error && <p className="update-error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="update-form">
          {[ 
            { label: "Name", name: "name" },
            { label: "Email", name: "email", type: "email" },
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
            <div key={name}>
              <label>{label}:</label>
              <input type={type} name={name} value={formData[name]} onChange={handleChange} />
            </div>
          ))}
          
          <div>
            <label>Profile Picture:</label>
            <input type="file" name="profilepic" accept="image/*" onChange={handleFileChange} />
          </div>
          
          <div>
            <label>Resume:</label>
            <input type="file" name="resume" accept="application/pdf" onChange={handleFileChange} />
          </div>
          
          <button type="submit" disabled={loading} className="update-button">
            {loading ? "Updating..." : "Submit Personal Detail"}
          </button>
        </form>

        <div className="additional-sections">
          <button onClick={() => setShowProjects(!showProjects)} className="update-button">
            Update Projects
          </button>
          {showProjects && (
            <>
              <UpdateProjects />
              <button onClick={() => setShowProjects(false)} className="update-button">Cancel</button>
            </>
          )}

          <button onClick={() => setShowLeadership(!showLeadership)} className="update-button">
            Update Leadership
          </button>
          {showLeadership && (
            <>
              <UpdateLeadership />
              <button onClick={() => setShowLeadership(false)} className="update-button">Cancel</button>
            </>
          )}

          <button onClick={() => setShowWorkExperience(!showWorkExperience)} className="update-button">
            Add Work Experience
          </button>
          {showWorkExperience && (
            <>
              <UpdateWorkExperience />
              <button onClick={() => setShowWorkExperience(false)} className="update-button">Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
