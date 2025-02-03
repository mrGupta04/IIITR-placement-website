import { useState } from "react";
import { useRouter } from "next/router";

export default function Update({ user, onUpdateSuccess }) {
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [mobileno, setMobileno] = useState(user?.mobileno || "");
  const [cgpa, setCgpa] = useState(user?.cgpa || "");
  const [profilepic, setProfilepic] = useState(null);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!user?.email) {
      setError("User email is missing!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("name", name);
    formData.append("mobileno", mobileno);
    formData.append("cgpa", cgpa);

    if (profilepic) formData.append("profilepic", profilepic);
    if (resume) formData.append("resume", resume);

    try {
      const res = await fetch("/api/auth/user/update", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Update failed.");
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      // Update parent component and close form
      onUpdateSuccess(data.user);

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
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="update-input"
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileno}
            onChange={(e) => setMobileno(e.target.value)}
            className="update-input"
            required
          />
          <input
            type="text"
            placeholder="CGPA"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            className="update-input"
            required
          />
          <input
            type="file"
            onChange={(e) => setProfilepic(e.target.files[0])}
            className="update-file-input"
          />
          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            className="update-file-input"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Submit"}
          </button>

          <button type="button" onClick={() => onUpdateSuccess(null)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
