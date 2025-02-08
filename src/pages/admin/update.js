import { useState, useEffect } from "react";
import styles from '../../styles/Admin-update.module.css';
import { useRouter } from "next/router";

export default function Update({ onUpdateSuccess }) {
  const router = useRouter();
  let storedAdmin = {};

  try {
    storedAdmin = JSON.parse(localStorage.getItem("Admin")) || {};
  } catch (error) {
    console.error("Error parsing Admin data from localStorage:", error);
    storedAdmin = {};
  }

  const [name, setName] = useState(storedAdmin?.name || "");
  const [mobileno, setMobileno] = useState(storedAdmin?.mobileno || "");
  const [city, setCity] = useState(storedAdmin?.city || "");
  const [state, setState] = useState(storedAdmin?.state || "");
  const [aboutCompany, setAboutCompany] = useState(storedAdmin?.aboutCompany || "");
  const [industryType, setIndustryType] = useState(storedAdmin?.industryType || "");
  const [website, setWebsite] = useState(storedAdmin?.website || "");
  const [profilepic, setProfilepic] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCancelupdate = () => {
    router.back();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    router.back()

   
    
    const formData = new FormData();
    formData.append("email", storedAdmin.email);
    formData.append("name", name);
    formData.append("mobileno", mobileno);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("aboutCompany", aboutCompany);
    formData.append("industryType", industryType);
    formData.append("website", website);

    if (profilepic) formData.append("profilepic", profilepic);

    try {
      const res = await fetch("/api/auth/admin/update", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Update failed.");
      }

      localStorage.setItem("Admin", JSON.stringify(data.Admin));

      // Update parent component and close form
      onUpdateSuccess(data.Admin);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.adminupdatepage}>
      <div className={styles.adminupdatebox}>
        <h2 className={styles.adminupdateheading}>Update Admin Account</h2>
        {error && <p className={styles.adminupdaterror}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.adminupdatefrom}>
          <input type="text" placeholder="Company Name" value={name} onChange={(e) => setName(e.target.value)} className={styles.adminupdateinput} required />
          <input type="text" placeholder="Mobile Number" value={mobileno} onChange={(e) => setMobileno(e.target.value)} className={styles.adminupdateinput} required />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className={styles.adminupdateinput} required />
          <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className={styles.adminupdateinput} required />
          <input type="text" placeholder="About Company" value={aboutCompany} onChange={(e) => setAboutCompany(e.target.value)} className={styles.adminupdateinput} />
          <input type="text" placeholder="Industry Type" value={industryType} onChange={(e) => setIndustryType(e.target.value)} className={styles.adminupdateinput} />
          <input type="text" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} className={styles.adminupdateinput} />
          
          <label className="file-upload-label">Profile Picture</label>
          <input type="file" onChange={(e) => setProfilepic(e.target.files[0])} className="update-file-input" />
          
          <button type="submit" disabled={loading} className={styles.adminupdateformbutton}>
            {loading ? "Updating..." : "Submit"}
          </button>

          <button type="button" onClick={handleCancelupdate} className={styles.adminupdatecancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}