import { useState } from "react";
import { useRouter } from "next/router";

const InputField = ({ name, type, placeholder, value, onChange, required = false }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className
    required={required}
  />
);

const SelectField = ({ name, value, options, onChange, required = false }) => (
  <select name={name} value={value} onChange={onChange} className required={required}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>
);

const DynamicSection = ({ label, fields, onAdd, onChange, renderField }) => (
  <div className>
    <label>{label}:</label>
    {fields.map((field, index) => renderField(field, index, onChange))}
    <button type="button" onClick={onAdd} >+</button>
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

  const skillsOptions = [
    { value: "Python", label: "Python" }, { value: "JavaScript", label: "JavaScript" }, { value: "React", label: "React" },
    { value: "SQL", label: "SQL" }, { value: "Node.js", label: "Node.js" }, { value: "AWS", label: "AWS" },
    { value: "Django", label: "Django" }, { value: "C++", label: "C++" }, { value: "Java", label: "Java" }
  ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSkillChange = (e, index) => {
    const updatedSkills = [...selectedSkills];
    updatedSkills[index] = e.target.value;
    setSelectedSkills(updatedSkills);
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
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      return setError("Invalid email format.");
    }

    // Validate mobile number
    if (!validateMobile(formData.mobileno)) {
      return setError("Mobile number must be 10 digits.");
    }


    if (!validatePassword(formData.password)) {
      return setError("Password must be at least 8 characters, contain a letter, number, and special character.");
    };
    if (formData.password !== formData.reenterpassword) return setError("Passwords do not match.");

    setLoading(true);
    const data = new FormData();

    // Append form fields
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    // Ensure profile pic and resume are valid before appending
    if (profilepic instanceof File) data.append("profilepic", profilepic);
    if (resume instanceof File) data.append("resume", resume);

    // Append JSON stringified fields
    data.append("skills", JSON.stringify(selectedSkills.filter(skill => skill.trim() !== "")));
    data.append("project", JSON.stringify(project || []));
    data.append("workExperience", JSON.stringify(workExperience || []));
    data.append("leadership", JSON.stringify(leadership || []));

    // Debugging: Log FormData contents
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }
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

      // Save token and user data to localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user)); // Store user data

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
    <div className>
      <div className>
        <h2 className>Create Account</h2>
        {error && <p className>{error}</p>}
        <form onSubmit={handleSignup} >
          {/* Form Fields */}
          <InputField name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <InputField name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          <InputField name="mobileno" type="text" placeholder="Mobile Number" value={formData.mobileno} onChange={handleChange} />

          <SelectField
            name="batch"
            value={formData.batch}
            options={[{ label: "Select Batch", value: "" }, { label: "Batch 2023", value: "Batch 2023" }, { label: "Batch 2024", value: "Batch 2024" }, { label: "Batch 2025", value: "Batch 2025" }]}
            onChange={handleChange}
          />

          <InputField name="rollno" type="text" placeholder="Roll Number" value={formData.rollno} onChange={handleChange} />

          <SelectField
            name="department"
            value={formData.department}
            options={[{ label: "Select Department", value: "" }, { label: "Computer Science", value: "Computer Science" }, { label: "Electrical Engineering", value: "Electrical Engineering" }, { label: "Mechanical Engineering", value: "Mechanical Engineering" }, { label: "Civil Engineering", value: "Civil Engineering" }]}
            onChange={handleChange}
          />

          <InputField name="cgpa" type="text" placeholder="CGPA" value={formData.cgpa} onChange={handleChange} />

          <SelectField
            name="gender"
            value={formData.gender}
            options={[{ label: "Select Gender", value: "" }, { label: "Male", value: "Male" }, { label: "Female", value: "Female" }, { label: "Other", value: "Other" }]}
            onChange={handleChange}
          />

          <InputField name="linkedin" type="text" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={handleChange} />
          <InputField name="github" type="text" placeholder="GitHub Profile" value={formData.github} onChange={handleChange} />
          <InputField name="leetcode" type="text" placeholder="LeetCode Profile" value={formData.leetcode} onChange={handleChange} />
          <InputField
            name="portfolio"
            type="text"
            placeholder="Portfolio URL"
            value={formData.portfolio}
            onChange={handleChange}
          />

          {/* Dynamic Fields */}
          <DynamicSection
            label="Skills"
            fields={selectedSkills}
            onAdd={addSkill}
            onChange={handleSkillChange}
            renderField={(field, index) => (
              <div key={index} className>
                <SelectField
                  name={`skill-${index}`}
                  value={field}
                  options={skillsOptions}
                  onChange={(e) => handleSkillChange(e, index)}
                />
              </div>
            )}
          />
          <DynamicSection
            label="project"
            fields={project}
            onAdd={addProject}
            onChange={handleProjectChange}
            renderField={(lead, index) => (
              <div key={index} >
                <InputField
                  name="Title"
                  type="text"
                  placeholder="Title"
                  value={lead.activity}
                  onChange={(e) => handleProjectChange(e, index)}
                />
                <InputField
                  name="skillused"
                  type="text"
                  placeholder="Skill Used"
                  value={lead.role}
                  onChange={(e) => handleProjectChange(e, index)}
                />
                <InputField
                  name="date"
                  type="text"
                  placeholder="Start-end date"
                  value={lead.duration}
                  onChange={(e) => handleProjectChange(e, index)}
                />
                <InputField
                  name="description"
                  type="text"
                  placeholder="description"
                  value={lead.description}
                  onChange={(e) => handleProjectChange(e, index)}
                />
              </div>
            )}
          />

          <DynamicSection
            label="Work Experience"
            fields={workExperience}
            onAdd={addWorkExperience}
            onChange={handleWorkExperienceChange}
            renderField={(exp, index) => (
              <div key={index} className>
                <InputField name="company" type="text" placeholder="Company Name" value={exp.company} onChange={(e) => handleWorkExperienceChange(e, index)} />
                <InputField name="jobTitle" type="text" placeholder="Job Title" value={exp.jobTitle} onChange={(e) => handleWorkExperienceChange(e, index)} />
                <InputField name="duration" type="text" placeholder="Duration" value={exp.duration} onChange={(e) => handleWorkExperienceChange(e, index)} />
                <InputField name="description" type="text" placeholder="Job Description" value={exp.description} onChange={(e) => handleWorkExperienceChange(e, index)} />
              </div>
            )}
          />
          <DynamicSection
            label="Leadership"
            fields={leadership}
            onAdd={addLeadership}
            onChange={handleLeadershipChange}
            renderField={(lead, index) => (
              <div key={index} className>
                <InputField
                  name="activity"
                  type="text"
                  placeholder="Activity"
                  value={lead.activity}
                  onChange={(e) => handleLeadershipChange(e, index)}
                />
                <InputField
                  name="role"
                  type="text"
                  placeholder="Role"
                  value={lead.role}
                  onChange={(e) => handleLeadershipChange(e, index)}
                />
                <InputField
                  name="duration"
                  type="text"
                  placeholder="Duration"
                  value={lead.duration}
                  onChange={(e) => handleLeadershipChange(e, index)}
                />
                <InputField
                  name="description"
                  type="text"
                  placeholder="Description"
                  value={lead.description}
                  onChange={(e) => handleLeadershipChange(e, index)}
                />
              </div>
            )}
          />
          {/* File Upload Section */}
          <div className>
            {/* Profile Pic */}
            <label htmlFor="profilePic" className>Choose Profile Pic</label>
            <input
              id="profilePic"
              type="file"
              onChange={(e) => setProfilepic(e.target.files[0])}
              className
            />

            {/* Resume */}
            <label htmlFor="resume" className>Upload Resume</label>
            <input
              id="resume"
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              className
            />
          </div>


          <InputField
            name="preferredLocation"
            type="text"
            placeholder="Preferred Location"
            value={formData.preferredLocation}
            onChange={handleChange}
          />

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
          />

          <InputField name="password" type="text" placeholder="Enter password" value={formData.password} onChange={handleChange} />
          <InputField name="reenterpassword" type="text" placeholder="reenter- password" value={formData.reenterpassword} onChange={handleChange} />

          <button type="submit" disabled={loading} className="submit">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );

}