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
  });

  const [logo, setLogo] = useState(null);
  const [logoName, setLogoName] = useState("Choose Logo");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  // Enhanced validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateMobile = (mobileno) => /^[0-9]{10}$/.test(mobileno);
  const validatePassword = (password) => {
    return password === process.env.NEXT_PUBLIC_ADMIN_PASS;
  };
  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouchedFields(prev => ({ ...prev, [name]: true }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      setLogo(file);
      setLogoName(file.name);
      setError("");
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Company/Recruiter name is required");
      return false;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!validateMobile(formData.mobileno)) {
      setError("Mobile number must be 10 digits");
      return false;
    }
    if (!validatePassword(formData.password)) {
      setError("Please use the password provided by IIITR");
      return false;
    }
    if (formData.website && !validateUrl(formData.website)) {
      setError("Please enter a valid website URL");
      return false;
    }
    if (!logo) {
      setError("Company logo is required");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    data.append("logo", logo);

    try {
      const res = await fetch("/api/auth/admin/signup", {
        method: "POST",
        body: data,
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "Signup failed. Please try again.");
      }

      // Store auth data
      localStorage.setItem("token", response.token);
      localStorage.setItem("admin", JSON.stringify(response.recruiter));

      // Update parent state
      setAdmin(response.recruiter);
      setLoginsign(true);

      // Redirect
      router.push("/profile");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to show field errors
  const getFieldError = (fieldName) => {
    if (!touchedFields[fieldName]) return null;

    switch (fieldName) {
      case "email":
        return !validateEmail(formData.email) ? "Invalid email format" : null;
      case "mobileno":
        return !validateMobile(formData.mobileno) ? "Must be 10 digits" : null;
      case "password":
        return !validatePassword(formData.password) ? "Incorrect password" : null;
      case "website":
        return formData.website && !validateUrl(formData.website) ? "Invalid URL" : null;
      default:
        return !formData[fieldName] ? "This field is required" : null;
    }
  };

  return (
    <div className={styles.signupPageContainer}>
      <div className={styles.signupBoxContainer}>
        <h2 className={styles.signupHeading}>Recruiter Sign Up</h2>

        {error && (
          <div className={styles.signupErrorMessage}>
            <p>{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSignup}
          className={styles.signupForm}
          encType="multipart/form-data"
          noValidate
        >
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              placeholder="Company/Recruiter Name"
              value={formData.name}
              onChange={handleChange}
              className={styles.signupInput}
              required
            />
            {getFieldError("name") && (
              <span className={styles.fieldError}>{getFieldError("name")}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={styles.signupInput}
              required
            />
            {getFieldError("email") && (
              <span className={styles.fieldError}>{getFieldError("email")}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              type="tel"
              name="mobileno"
              placeholder="Mobile Number"
              value={formData.mobileno}
              onChange={handleChange}
              className={styles.signupInput}
              required
              maxLength="10"
            />
            {getFieldError("mobileno") && (
              <span className={styles.fieldError}>{getFieldError("mobileno")}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={styles.signupInput}
              required
            />
            {getFieldError("city") && (
              <span className={styles.fieldError}>{getFieldError("city")}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className={styles.signupInput}
              required
            />
            {getFieldError("state") && (
              <span className={styles.fieldError}>{getFieldError("state")}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <textarea
              name="aboutCompany"
              placeholder="About Company"
              value={formData.aboutCompany}
              onChange={handleChange}
              className={styles.signupTextarea}
              required
              rows="4"
            />
            {getFieldError("aboutCompany") && (
              <span className={styles.fieldError}>{getFieldError("aboutCompany")}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              name="industryType"
              placeholder="Industry Type"
              value={formData.industryType}
              onChange={handleChange}
              className={styles.signupInput}
              required
            />
            {getFieldError("industryType") && (
              <span className={styles.fieldError}>{getFieldError("industryType")}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              type="url"
              name="website"
              placeholder="Website URL (optional)"
              value={formData.website}
              onChange={handleChange}
              className={styles.signupInput}
            />
            {getFieldError("website") && (
              <span className={styles.fieldError}>{getFieldError("website")}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <div className={styles.fileInputContainer}>
              <label className={styles.fileInputLabel}>
                {logoName}
                <input
                  type="file"
                  onChange={handleLogoChange}
                  className={styles.signupFileInput}
                  accept="image/*"
                  required
                />
              </label>
            </div>
            {!logo && touchedFields.logo && (
              <span className={styles.fieldError}>Logo is required</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={styles.signupInput}
              required
            />
            {getFieldError("password") && (
              <span className={styles.fieldError}>{getFieldError("password")}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.signupButton}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Processing...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}