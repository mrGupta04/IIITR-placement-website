import { useState } from "react";
import Select from 'react-select';
import { useRouter } from "next/router";
import styles from '../../styles/User-signup.module.css';

const InputField = ({ name, type, placeholder, value, onChange, required = false, className }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`${styles.inputField} ${className}`}
    required={required}
  />
);

const SelectField = ({ name, value, options, onChange, required = false, className }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className={`${styles.selectField} ${className}`}
    required={required}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>
);

const DynamicSection = ({ label, fields, onAdd, onChange, renderField, className }) => (
  <div className={`${styles.dynamicSection} ${className}`}>
    <label className={styles.dynamicSectionLabel}>{label}:</label>
    {fields.map((field, index) => renderField(field, index, onChange))}
    <button type="button" onClick={onAdd} className={styles.addButton}>Add</button>
  </div>
);

export default function Signup({ setUser, setLoginsign }) {
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const [formData, setFormData] = useState({
    name: "", email: "", mobileno: "", batch: "", rollno: "", department: "", cgpa: "",
    password: "", reenterpassword: "", gender: "", linkedin: "", github: "", leetcode: "",
    portfolio: "", preferredLocation: "", jobType: ""
  });

  const [profilepic, setProfilepic] = useState(null);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [project, setProject] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const skillsOptions = [
    { value: "Python", label: "Python" }, { value: "JavaScript", label: "JavaScript" }, { value: "React", label: "React" },
    { value: "SQL", label: "SQL" }, { value: "Node.js", label: "Node.js" }, { value: "AWS", label: "AWS" },
    { value: "Django", label: "Django" }, { value: "C++", label: "C++" }, { value: "Java", label: "Java" }
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSkillChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill.value !== skillToRemove.value));
  };

  const addSkill = () => setSelectedSkills([...selectedSkills, ""]);

  const addWorkExperience = () => setWorkExperience([...workExperience, { company: "", jobTitle: "", duration: "", description: "" }]);

  const addLeadership = () => setLeadership([...leadership, { activity: "", role: "", duration: "", description: "" }]);
  const addProject = () => setProject([...project, { title: "", skillused: "", description: "", date: "" }]);

  const handleWorkExperienceChange = (e, index) => {
    const updatedExp = [...workExperience];
    updatedExp[index][e.target.name] = e.target.value;
    setWorkExperience(updatedExp);
  };

  const handleLeadershipChange = (e, index) => {
    const updatedLeadership = [...leadership];
    updatedLeadership[index][e.target.name] = e.target.value;
    setLeadership(updatedLeadership);
  };

  const handleProjectChange = (e, index) => {
    const updatedProject = [...project];
    updatedProject[index][e.target.name] = e.target.value;
    setProject(updatedProject);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      return setError("Invalid email format.");
    }

    if (!validateMobile(formData.mobileno)) {
      return setError("Mobile number must be 10 digits.");
    }

    if (!validatePassword(formData.password)) {
      return setError("Password must be at least 8 characters, contain a letter, number, and special character.");
    };

    if (formData.password !== formData.reenterpassword) return setError("Passwords do not match.");

    setLoading(true);
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    if (profilepic instanceof File) data.append("profilepic", profilepic);
    if (resume instanceof File) data.append("resume", resume);

    data.append("skills", JSON.stringify(selectedSkills.filter(skill => skill.trim() !== "")));
    data.append("project", JSON.stringify(project || []));
    data.append("workExperience", JSON.stringify(workExperience || []));
    data.append("leadership", JSON.stringify(leadership || []));

    try {
      const res = await fetch("/api/auth/user/signup", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Signup failed.");
      }

      const result = await res.json();

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      setUser(result.user);
      setLoginsign(true);

    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupMaincontainer} id="signupMaincontainer">
      <div className={styles.signupinternalcontainer} id="signupinternalcontainer">
        <h2 className={styles.heading} id="heading">Create Account</h2>
        {error && <p className={styles.error} id="error">{error}</p>}
        <form onSubmit={handleSignup} className={styles.form} id="form">
          <InputField name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} className={styles.inputField} />
          <InputField name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={styles.inputField} />
          <InputField name="mobileno" type="text" placeholder="Mobile Number" value={formData.mobileno} onChange={handleChange} className={styles.inputField} />

          <SelectField
            name="batch"
            value={formData.batch}
            options={[{ label: "Select Batch", value: "" }, { label: "Batch 2023", value: "Batch 2023" }, { label: "Batch 2024", value: "Batch 2024" }, { label: "Batch 2025", value: "Batch 2025" }]}
            onChange={handleChange}
            className={styles.selectField}
          />

          <InputField name="rollno" type="text" placeholder="Roll Number" value={formData.rollno} onChange={handleChange} className={styles.inputField} />

          <SelectField
            name="department"
            value={formData.department}
            options={[{ label: "Select Department", value: "" }, { label: "Computer Science", value: "Computer Science" }, { label: "Electrical Engineering", value: "Electrical Engineering" }, { label: "Mechanical Engineering", value: "Mechanical Engineering" }, { label: "Civil Engineering", value: "Civil Engineering" }]}
            onChange={handleChange}
            className={styles.selectField}
          />

          <InputField name="cgpa" type="text" placeholder="CGPA" value={formData.cgpa} onChange={handleChange} className={styles.inputField} />

          <SelectField
            name="gender"
            value={formData.gender}
            options={[{ label: "Select Gender", value: "" }, { label: "Male", value: "Male" }, { label: "Female", value: "Female" }, { label: "Other", value: "Other" }]}
            onChange={handleChange}
            className={styles.selectField}
          />

          <InputField name="linkedin" type="text" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={handleChange} className={styles.inputField} />
          <InputField name="github" type="text" placeholder="GitHub Profile" value={formData.github} onChange={handleChange} className={styles.inputField} />
          <InputField name="leetcode" type="text" placeholder="LeetCode Profile" value={formData.leetcode} onChange={handleChange} className={styles.inputField} />
          <InputField name="portfolio" type="text" placeholder="Portfolio URL" value={formData.portfolio} onChange={handleChange} className={styles.inputField} />

          <div className={styles.skillsContainer} id="skillsContainer">
            <label className={styles.skillsLabel} id="skillsLabel">Skills</label>
            <div className={styles.addSkillsBox} id="addSkillsBox" onClick={toggleDropdown}>
              <span>{selectedSkills.length === 0 ? 'Add Skills' : 'Edit Skills'}</span>
            </div>
            {selectedSkills.length > 0 && (
              <div className={styles.selectedSkillsBox} id="selectedSkillsBox">
                {selectedSkills.map(skill => (
                  <div key={skill.value} className={styles.selectedSkill} id="selectedSkill">
                    {skill.label}
                    <span className={styles.removeSkill} id="removeSkill" onClick={() => removeSkill(skill)}>
                      &times;
                    </span>
                  </div>
                ))}
              </div>
            )}
            {showDropdown && (
              <div className={styles.dropdown} id="dropdown">
                <Select
                  options={skillsOptions}
                  isMulti
                  value={selectedSkills}
                  onChange={handleSkillChange}
                />
              </div>
            )}
          </div>

          <DynamicSection
            label="Project"
            fields={project}
            onAdd={addProject}
            onChange={handleProjectChange}
            renderField={(lead, index) => (
              <div key={index} className={styles.dynamicField} id="dynamicField">
                <InputField name="title" type="text" placeholder="Title" value={lead.title} onChange={(e) => handleProjectChange(e, index)} className={styles.inputField} />
                <InputField name="skillused" type="text" placeholder="Skill Used" value={lead.skillused} onChange={(e) => handleProjectChange(e, index)} className={styles.inputField} />
                <InputField name="date" type="text" placeholder="Start-end date" value={lead.date} onChange={(e) => handleProjectChange(e, index)} className={styles.inputField} />
                <InputField name="description" type="text" placeholder="Description" value={lead.description} onChange={(e) => handleProjectChange(e, index)} className={styles.inputField} />
              </div>
            )}
            className={styles.dynamicSection}
          />

          <DynamicSection
            label="Work Experience"
            fields={workExperience}
            onAdd={addWorkExperience}
            onChange={handleWorkExperienceChange}
            renderField={(exp, index) => (
              <div key={index} className={styles.dynamicField} id="dynamicField">
                <InputField name="company" type="text" placeholder="Company Name" value={exp.company} onChange={(e) => handleWorkExperienceChange(e, index)} className={styles.inputField} />
                <InputField name="jobTitle" type="text" placeholder="Job Title" value={exp.jobTitle} onChange={(e) => handleWorkExperienceChange(e, index)} className={styles.inputField} />
                <InputField name="duration" type="text" placeholder="Duration" value={exp.duration} onChange={(e) => handleWorkExperienceChange(e, index)} className={styles.inputField} />
                <InputField name="description" type="text" placeholder="Job Description" value={exp.description} onChange={(e) => handleWorkExperienceChange(e, index)} className={styles.inputField} />
              </div>
            )}
            className={styles.dynamicSection}
          />

          <DynamicSection
            label="Leadership"
            fields={leadership}
            onAdd={addLeadership}
            onChange={handleLeadershipChange}
            renderField={(lead, index) => (
              <div key={index} className={styles.dynamicField} id="dynamicField">
                <InputField name="activity" type="text" placeholder="Activity" value={lead.activity} onChange={(e) => handleLeadershipChange(e, index)} className={styles.inputField} />
                <InputField name="role" type="text" placeholder="Role" value={lead.role} onChange={(e) => handleLeadershipChange(e, index)} className={styles.inputField} />
                <InputField name="duration" type="text" placeholder="Duration" value={lead.duration} onChange={(e) => handleLeadershipChange(e, index)} className={styles.inputField} />
                <InputField name="description" type="text" placeholder="Description" value={lead.description} onChange={(e) => handleLeadershipChange(e, index)} className={styles.inputField} />
              </div>
            )}
            className={styles.dynamicSection}
          />

          <div className={styles.Profilepic} id="Profilepic">
            <label htmlFor="profilePic" className={styles.fileLabel} id="fileLabel">Choose Profile Pic</label>
            <input id="profilePic" type="file" onChange={(e) => setProfilepic(e.target.files[0])} className={styles.fileInput} />
            <label htmlFor="resume" className={styles.fileLabel} id="fileLabel">Upload Resume</label>
            <input id="resume" type="file" onChange={(e) => setResume(e.target.files[0])} className={styles.fileInput} />
          </div>

          <InputField name="preferredLocation" type="text" placeholder="Preferred Location" value={formData.preferredLocation} onChange={handleChange} className={styles.inputField} />

          <SelectField
            name="jobType"
            value={formData.jobType}
            options={[
              { label: "Select Job Type", value: "" },
              { label: "Full-time", value: "Full-time" },
              { label: "Part-time", value: "Part-time" },
              { label: "Internship", value: "Internship" },
            ]}
            onChange={handleChange}
            className={styles.selectField}
          />

          <InputField name="password" type="password" placeholder="Enter password" value={formData.password} onChange={handleChange} className={styles.inputField} />
          <InputField name="reenterpassword" type="password" placeholder="Re-enter password" value={formData.reenterpassword} onChange={handleChange} className={styles.inputField} />

          <button type="submit" disabled={loading} className={styles.submitButton} id="submitButton">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}