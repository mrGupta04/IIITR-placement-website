import { useState } from "react";

export default function Update({ Admin, onUpdateSuccess }) {
  const [name, setName] = useState(Admin?.name || "");
  const [mobileno, setMobileno] = useState(Admin?.mobileno || "");
  const [city, setCity] = useState(Admin?.city || "");
  const [state, setState] = useState(Admin?.state || "");
  const [aboutCompany, setAboutCompany] = useState(Admin?.aboutCompany || "");
  const [industryType, setIndustryType] = useState(Admin?.industryType || "");
  const [website, setWebsite] = useState(Admin?.website || "");
  const [profilepic, setProfilepic] = useState(null);
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!Admin?.email) {
      setError("Admin email is missing!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", Admin.email);
    formData.append("name", name);
    formData.append("mobileno", mobileno);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("aboutCompany", aboutCompany);
    formData.append("industryType", industryType);
    formData.append("website", website);

    if (profilepic) formData.append("profilepic", profilepic);
    if (logo) formData.append("logo", logo);

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
    <div className="update-page-container">
      <div className="update-box-container">
        <h2 className="update-heading">Update Admin Account</h2>
        {error && <p className="update-error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="update-form">
          <input type="text" placeholder="Company Name" value={name} onChange={(e) => setName(e.target.value)} className="update-input" required />
          <input type="text" placeholder="Mobile Number" value={mobileno} onChange={(e) => setMobileno(e.target.value)} className="update-input" required />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="update-input" required />
          <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className="update-input" required />
          <input type="text" placeholder="About Company" value={aboutCompany} onChange={(e) => setAboutCompany(e.target.value)} className="update-input" />
          <input type="text" placeholder="Industry Type" value={industryType} onChange={(e) => setIndustryType(e.target.value)} className="update-input" />
          <input type="text" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} className="update-input" />
          
          <label className="file-upload-label">Profile Picture</label>
          <input type="file" onChange={(e) => setProfilepic(e.target.files[0])} className="update-file-input" />
          
          <label className="file-upload-label">Company Logo</label>
          <input type="file" onChange={(e) => setLogo(e.target.files[0])} className="update-file-input" />

          <button type="submit" disabled={loading} className="update-button">
            {loading ? "Updating..." : "Submit"}
          </button>

          <button type="button" onClick={() => onUpdateSuccess(null)} className="cancel-button">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
