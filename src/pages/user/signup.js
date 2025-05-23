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
    className={`${styles.signupInput} ${className}`}
    required={required}
  />
);

const SelectField = ({ name, value, options, onChange, required = false, className }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className={`${styles.signupSelect} ${className}`}
    required={required}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>
);

const DynamicSection = ({ label, fields, onAdd, onChange, renderField }) => (
  <div className={styles.dynamicSection}>
    <label className={styles.dynamicSectionLabel}>{label}:</label>
    {fields.map((field, index) => renderField(field, index, onChange))}
    <button type="button" onClick={onAdd} className={styles.addButton}>
      {fields.length === 0 ? 'Add' : 'Add More'}
    </button>
  </div>
);

export default function Signup({ setUser, setLoginsign }) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const validateEmail = (email) => {
    const lowerEmail = email.toLowerCase();
    const regex = /^(cs|ad|mc)(21|22|23|24|25)b1\d{3}@iiitr\.ac\.in$/;
    return regex.test(lowerEmail);
  };
  
  const validateMobile = (mobile) => /^\d{10}$/.test(mobile);
  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);

  const [formData, setFormData] = useState({
    name: "", email: "", mobileno: "", batch: "", rollno: "", department: "", cgpa: "", gender: "",
    linkedin: "", github: "", leetcode: "", portfolio: "", preferredLocation: "", jobType: "",
    password: "", reenterpassword: ""
  });

  const [profilepic, setProfilepic] = useState(null);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [project, setProject] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [leadership, setLeadership] = useState([]);

  const skillsOptions = [
    { value: "Python", label: "Python" }, { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" }, { value: "SQL", label: "SQL" },
    { value: "Node.js", label: "Node.js" }, { value: "AWS", label: "AWS" },
    { value: "Django", label: "Django" }, { value: "C++", label: "C++" },
    { value: "Java", label: "Java" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill.value !== skillToRemove.value));
  };

  const addWorkExperience = () => setWorkExperience([...workExperience, 
    { company: "", jobTitle: "", duration: "", description: "" }]);
  
  const addLeadership = () => setLeadership([...leadership, 
    { activity: "", role: "", duration: "", description: "" }]);
  
  const addProject = () => setProject([...project, 
    { title: "", skillused: "", description: "", date: "" }]);

  const handleWorkExperienceChange = (e, index) => {
    const updated = [...workExperience];
    updated[index][e.target.name] = e.target.value;
    setWorkExperience(updated);
  };

  const handleLeadershipChange = (e, index) => {
    const updated = [...leadership];
    updated[index][e.target.name] = e.target.value;
    setLeadership(updated);
  };

  const handleProjectChange = (e, index) => {
    const updated = [...project];
    updated[index][e.target.name] = e.target.value;
    setProject(updated);
  };

  const nextStep = () => {
    if(step===1&& !validateEmail(formData.email))
    {
      return setError("Use your college email!");
    }
    if (step === 1 && (!formData.name  || !validateMobile(formData.mobileno))) {
      return setError("Please fill all required fields correctly");
    }
    setError("");
    setStep(step + 1);
  };

  const prevStep = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
   
    if (!validatePassword(formData.password) || formData.password !== formData.reenterpassword) {
      return setError("Password requirements not met or passwords don't match");
    }

    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (profilepic) data.append("profilepic", profilepic);
    if (resume) data.append("resume", resume);
    data.append("skills", JSON.stringify(selectedSkills.map(skill => skill.value)));
    data.append("project", JSON.stringify(project));
    data.append("workExperience", JSON.stringify(workExperience));
    data.append("leadership", JSON.stringify(leadership));

    try {
      const res = await fetch("/api/auth/user/signup", { method: "POST", body: data });
      if (!res.ok) throw new Error((await res.json()).message || "Signup failed");
      
      const result = await res.json();
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      setLoginsign(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupPageContainer}>
      <div className={styles.signupBoxContainer}>
        <h2 className={styles.signupHeading}>Create Account</h2>
        
        <div className={styles.progressSteps}>
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className={`${styles.progressStep} ${step >= stepNum ? styles.active : ''}`}>
              <div className={styles.stepNumber}>{stepNum}</div>
              <div className={styles.stepLabel}>
                {['Personal', 'Contact', 'Professional', 'Password'][stepNum - 1]}
              </div>
            </div>
          ))}
        </div>

        {error && <p className={styles.signupErrorMessage}>{error}</p>}
        
        <div className={styles.formStepsContainer}>
          {/* Step 1: Personal Details */}
          <div className={`${styles.formStep} ${step === 1 ? styles.active : ''}`}>
            <div className={styles.stepContent}>
              <h3 className={styles.columnTitle}>Personal Information</h3>
              
              <InputField name="name" type="text" placeholder="Full Name" 
                value={formData.name} onChange={handleChange} required />
              
              <div className={styles.formRow}>
                <InputField name="email" type="email" placeholder="Email Address" 
                  value={formData.email} onChange={handleChange} required className={styles.halfWidth} />
                <InputField name="mobileno" type="text" placeholder="Mobile Number" 
                  value={formData.mobileno} onChange={handleChange} required className={styles.halfWidth} />
              </div>
              
              <div className={styles.formRow}>
                <SelectField name="batch" value={formData.batch} onChange={handleChange} required
                  options={[
                    { label: "Select Batch", value: "" },
                    { label: "2023", value: "2023" },
                    { label: "2024", value: "2024" },
                    { label: "2025", value: "2025" }
                  ]} className={styles.halfWidth} />
                <SelectField name="department" value={formData.department} onChange={handleChange} required
                  options={[
                    { label: "Select Department", value: "" },
                    { label: "Computer Science", value: "CS" },
                    { label: "Electrical", value: "EE" }
                  ]} className={styles.halfWidth} />
              </div>
              
              <div className={styles.formRow}>
                <InputField name="rollno" type="text" placeholder="Roll Number" 
                  value={formData.rollno} onChange={handleChange} required className={styles.halfWidth} />
                <InputField name="cgpa" type="text" placeholder="CGPA" 
                  value={formData.cgpa} onChange={handleChange} required className={styles.halfWidth} />
              </div>
              
              <SelectField name="gender" value={formData.gender} onChange={handleChange} required
                options={[
                  { label: "Select Gender", value: "" },
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Other", value: "Other" }
                ]} />
              
              <div className={styles.fileUploadContainer}>
                <div className={styles.customFileInput}>
                  <label htmlFor="profilePic" className={styles.fileLabel}>
                    📸 Choose Profile Pic
                    <input id="profilePic" type="file" accept="image/*" 
                      onChange={(e) => setProfilepic(e.target.files[0])} className={styles.fileInput} />
                  </label>
                  {profilepic && <p className={styles.fileName}>{profilepic.name}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Contact Information */}
          <div className={`${styles.formStep} ${step === 2 ? styles.active : ''}`}>
            <div className={styles.stepContent}>
              <h3 className={styles.columnTitle}>Contact Information</h3>
              
              <InputField name="linkedin" type="text" placeholder="LinkedIn Profile URL" 
                value={formData.linkedin} onChange={handleChange} />
              <InputField name="github" type="text" placeholder="GitHub Profile URL" 
                value={formData.github} onChange={handleChange} />
              <InputField name="leetcode" type="text" placeholder="LeetCode Profile" 
                value={formData.leetcode} onChange={handleChange} />
              <InputField name="portfolio" type="text" placeholder="Portfolio Website" 
                value={formData.portfolio} onChange={handleChange} />
              
              <div className={styles.formRow}>
                <InputField name="preferredLocation" type="text" placeholder="Preferred Location" 
                  value={formData.preferredLocation} onChange={handleChange} className={styles.halfWidth} />
                <SelectField name="jobType" value={formData.jobType} onChange={handleChange}
                  options={[
                    { label: "Job Type", value: "" },
                    { label: "Full-time", value: "Full-time" },
                    { label: "Part-time", value: "Part-time" },
                    { label: "Internship", value: "Internship" }
                  ]} className={styles.halfWidth} />
              </div>
            </div>
          </div>

          {/* Step 3: Professional Details */}
          <div className={`${styles.formStep} ${step === 3 ? styles.active : ''}`}>
            <div className={styles.stepContent}>
              <h3 className={styles.columnTitle}>Professional Details</h3>
              
              <div className={styles.skillsContainer}>
                <label className={styles.skillsLabel}>Your Skills</label>
                <Select
                  options={skillsOptions}
                  isMulti
                  value={selectedSkills}
                  onChange={handleSkillChange}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select your skills..."
                />
                {selectedSkills.length > 0 && (
                  <div className={styles.selectedSkillsBox}>
                    {selectedSkills.map(skill => (
                      <div key={skill.value} className={styles.selectedSkill}>
                        {skill.label}
                        <span className={styles.removeSkill} onClick={() => removeSkill(skill)}>
                          &times;
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.fileUploadContainer}>
                <div className={styles.customFileInput}>
                  <label htmlFor="resume" className={styles.fileLabel}>
                    📄 Upload Resume
                    <input id="resume" type="file" accept=".pdf,.doc,.docx" 
                      onChange={(e) => setResume(e.target.files[0])} className={styles.fileInput} />
                  </label>
                  {resume && <p className={styles.fileName}>{resume.name}</p>}
                </div>
              </div>

              <DynamicSection
                label="Projects"
                fields={project}
                onAdd={addProject}
                onChange={handleProjectChange}
                renderField={(project, index) => (
                  <div key={index} className={styles.dynamicField}>
                    <InputField name="title" type="text" placeholder="Project Title" 
                      value={project.title} onChange={(e) => handleProjectChange(e, index)} />
                    <div className={styles.formRow}>
                      <InputField name="skillused" type="text" placeholder="Skills Used" 
                        value={project.skillused} onChange={(e) => handleProjectChange(e, index)} className={styles.halfWidth} />
                      <InputField name="date" type="text" placeholder="Duration" 
                        value={project.date} onChange={(e) => handleProjectChange(e, index)} className={styles.halfWidth} />
                    </div>
                    <InputField name="description" type="text" placeholder="Description" 
                      value={project.description} onChange={(e) => handleProjectChange(e, index)} />
                  </div>
                )}
              />

              <DynamicSection
                label="Work Experience"
                fields={workExperience}
                onAdd={addWorkExperience}
                onChange={handleWorkExperienceChange}
                renderField={(exp, index) => (
                  <div key={index} className={styles.dynamicField}>
                    <div className={styles.formRow}>
                      <InputField name="company" type="text" placeholder="Company Name" 
                        value={exp.company} onChange={(e) => handleWorkExperienceChange(e, index)} className={styles.halfWidth} />
                      <InputField name="jobTitle" type="text" placeholder="Job Title" 
                        value={exp.jobTitle} onChange={(e) => handleWorkExperienceChange(e, index)} className={styles.halfWidth} />
                    </div>
                    <InputField name="duration" type="text" placeholder="Duration" 
                      value={exp.duration} onChange={(e) => handleWorkExperienceChange(e, index)} />
                    <InputField name="description" type="text" placeholder="Job Description" 
                      value={exp.description} onChange={(e) => handleWorkExperienceChange(e, index)} />
                  </div>
                )}
              />

              <DynamicSection
                label="Leadership & Activities"
                fields={leadership}
                onAdd={addLeadership}
                onChange={handleLeadershipChange}
                renderField={(lead, index) => (
                  <div key={index} className={styles.dynamicField}>
                    <div className={styles.formRow}>
                      <InputField name="activity" type="text" placeholder="Activity/Organization" 
                        value={lead.activity} onChange={(e) => handleLeadershipChange(e, index)} className={styles.halfWidth} />
                      <InputField name="role" type="text" placeholder="Your Role" 
                        value={lead.role} onChange={(e) => handleLeadershipChange(e, index)} className={styles.halfWidth} />
                    </div>
                    <InputField name="duration" type="text" placeholder="Duration" 
                      value={lead.duration} onChange={(e) => handleLeadershipChange(e, index)} />
                    <InputField name="description" type="text" placeholder="Description" 
                      value={lead.description} onChange={(e) => handleLeadershipChange(e, index)} />
                  </div>
                )}
              />
            </div>
          </div>

          {/* Step 4: Password */}
          <div className={`${styles.formStep} ${step === 4 ? styles.active : ''}`}>
            <div className={styles.stepContent}>
              <h3 className={styles.columnTitle}>Account Security</h3>
              
              <InputField name="password" type="password" placeholder="Create Password" 
                value={formData.password} onChange={handleChange} required />
              <InputField name="reenterpassword" type="password" placeholder="Confirm Password" 
                value={formData.reenterpassword} onChange={handleChange} required />
              
              <div className={styles.termsCheckbox}>
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">I agree to the Terms of Service and Privacy Policy</label>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          {step > 1 && (
            <button type="button" onClick={prevStep} className={styles.secondaryButton}>
              Back
            </button>
          )}
          
          {step < 4 ? (
            <button type="button" onClick={nextStep} className={styles.primaryButton}>
              Next
            </button>
          ) : (
            <button type="submit" onClick={handleSignup} disabled={loading} className={styles.submitButton}>
              {loading ? "Signing Up..." : "Create Account"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}