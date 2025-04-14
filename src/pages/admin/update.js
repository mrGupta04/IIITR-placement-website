import { useState, useEffect } from "react";
import styles from '../../styles/Admin-update.module.css';
import { useRouter } from "next/router";

export default function Update() {
  const router = useRouter();
  const [storedAdmin, setStoredAdmin] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    mobileno: "",
    city: "",
    state: "",
    aboutCompany: "",
    industryType: "",
    website: ""
  });
  const [logo, setLogo] = useState(null); // Changed from profilepic to logo
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    try {
      const admin = JSON.parse(localStorage.getItem("admin")) || {};
      setStoredAdmin(admin);
      setFormData({
        name: admin?.name || "",
        mobileno: admin?.mobileno || "",
        city: admin?.city || "",
        state: admin?.state || "",
        aboutCompany: admin?.aboutCompany || "",
        industryType: admin?.industryType || "",
        website: admin?.website || ""
      });
      if (admin?.logo) setPreviewImage(admin.logo);
    } catch (error) {
      console.error("Error parsing Admin data:", error);
    }
  }, []);

  const handleCancel = () => router.push("/admin/profile");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file); // Changed from setProfilepic to setLogo
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("email", storedAdmin.email);
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (logo) data.append("logo", logo); // Changed from profilepic to logo

    try {
      const res = await fetch("/api/auth/admin/update", {
        method: "POST",
        body: data,
      });

      const response = await res.json();
      if (!res.ok) throw new Error(response.message || "Update failed");

      localStorage.setItem("admin", JSON.stringify(response.admin));
      router.push("/admin/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.glassCard}>
        <div className={styles.header}>
          <h1>Update Profile</h1>
          <p>Manage your admin account details</p>
        </div>

        {error && (
          <div className={styles.errorAlert}>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path fill="currentColor" d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.avatarUpload}>
            <div className={styles.avatarPreview}>
              {previewImage ? (
                <img src={previewImage} alt="Profile preview" />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {formData.name ? formData.name.charAt(0) : "A"}
                </div>
              )}
            </div>
            <label className={styles.uploadButton}>
              <input 
                type="file" 
                onChange={handleImageChange} 
                accept="image/*"
              />
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Change Photo
            </label>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>Company Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobileno"
                value={formData.mobileno}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>About Company</label>
              <input
                type="text"
                name="aboutCompany"
                value={formData.aboutCompany}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Industry Type</label>
              <input
                type="text"
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
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
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}