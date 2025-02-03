import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Admin-signup.module.css"; 

export default function RecruiterSignup({ setAdmin, setLoginsign }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileno: "",
    city: "",
    state: "",
    aboutCompany: "",
    industryType: "",
    website: "",
    password: "",
    reenterpassword: "",
  });

  const [profilepic, setProfilepic] = useState(null);
  const [logo, setLogo] = useState(null); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateMobile = (mobileno) => /^[0-9]{10}$/.test(mobileno);
  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validateMobile(formData.mobileno)) {
      setError("Mobile number must be 10 digits.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters, contain a letter, number, and special character.");
      return;
    }

    if (formData.password !== formData.reenterpassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (profilepic) data.append("profilepic", profilepic);
    if (logo) data.append("logo", logo);

    try {
      const res = await fetch("/api/auth/admin/signup", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Signup failed.");
      }

      const result = await res.json();
      localStorage.setItem("token", result.token);
      localStorage.setItem("admin", JSON.stringify(result.recruiter));
      setAdmin(result.recruiter);
      setLoginsign(true);
      router.push("/profile"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupPageContainer}>
      <div className={styles.signupBoxContainer}>
        <h2 className={styles.signupHeading}>Recruiter Sign Up</h2>
        {error && <p className={styles.signupErrorMessage}>{error}</p>}
        <form onSubmit={handleSignup} className={styles.signupForm} encType="multipart/form-data">
          <input type="text" name="name" placeholder="Company/Recruiter Name" value={formData.name} onChange={handleChange} className={styles.signupInput} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={styles.signupInput} required />
          <input type="text" name="mobileno" placeholder="Mobile Number" value={formData.mobileno} onChange={handleChange} className={styles.signupInput} required />
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className={styles.signupInput} required />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className={styles.signupInput} required />
          <textarea name="aboutCompany" placeholder="About Company" value={formData.aboutCompany} onChange={handleChange} className={styles.signupTextarea} required />
          <input type="text" name="industryType" placeholder="Industry Type" value={formData.industryType} onChange={handleChange} className={styles.signupInput} required />
          <input type="url" name="website" placeholder="Website URL" value={formData.website} onChange={handleChange} className={styles.signupInput} required />
          <input type="file" onChange={(e) => setProfilepic(e.target.files[0])} className={styles.signupFileInput} required />
          <input type="file" onChange={(e) => setLogo(e.target.files[0])} className={styles.signupFileInput} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={styles.signupInput} required />
          <input type="password" name="reenterpassword" placeholder="Confirm Password" value={formData.reenterpassword} onChange={handleChange} className={styles.signupInput} required />
          <button type="submit" className={styles.signupButton} disabled={loading}>
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
