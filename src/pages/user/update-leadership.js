import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/UpdateLeadership.module.css";

const InputField = ({ name, type, placeholder, value, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={styles.inputField}
  />
);

const TextAreaField = ({ name, placeholder, value, onChange }) => (
  <textarea
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={styles.textareaField}
    rows="3"
  />
);

export default function UpdateLeadership() {
  const router = useRouter();
  const [leadership, setLeadership] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("User"));
    if (userData?.leadership) {
      setLeadership(userData.leadership);
    } else {
      setLeadership([{ activity: "", role: "", duration: "", description: "" }]);
    }
  }, []);

  const addLeadership = () => {
    setLeadership([
      ...leadership,
      { activity: "", role: "", duration: "", description: "" },
    ]);
  };

  const handleLeadershipChange = (e, index) => {
    const updatedLeadership = [...leadership];
    updatedLeadership[index][e.target.name] = e.target.value;
    setLeadership(updatedLeadership);
  };

  const handleDelete = (index) => {
    setLeadership(leadership.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("User"));
    const email = userData.email;

    try {
      const response = await fetch("/api/auth/user/updateleadership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, leadership }),
      });

      if (!response.ok) throw new Error("Failed to update leadership");

      const updatedUserData = JSON.parse(localStorage.getItem("User"));
      updatedUserData.leadership = leadership;
      localStorage.setItem("User", JSON.stringify(updatedUserData));

      router.push("/profile");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Leadership Experience</h2>
          <p className={styles.subtitle}>Add your leadership roles and activities</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {leadership.map((lead, index) => (
            <div key={index} className={styles.entryCard}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>Leadership #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className={styles.deleteButton}
                  aria-label="Delete entry"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13H5v-2h14v2z" />
                  </svg>
                </button>
              </div>

              <div className={styles.inputGroup}>
                <InputField
                  name="activity"
                  type="text"
                  placeholder="Activity or Organization"
                  value={lead.activity}
                  onChange={(e) => handleLeadershipChange(e, index)}
                />
                <InputField
                  name="role"
                  type="text"
                  placeholder="Your Role"
                  value={lead.role}
                  onChange={(e) => handleLeadershipChange(e, index)}
                />
                <InputField
                  name="duration"
                  type="text"
                  placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
                  value={lead.duration}
                  onChange={(e) => handleLeadershipChange(e, index)}
                />
                <TextAreaField
                  name="description"
                  placeholder="Description of your responsibilities and achievements"
                  value={lead.description}
                  onChange={(e) => handleLeadershipChange(e, index)}
                />
              </div>
            </div>
          ))}

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={addLeadership}
              className={styles.addButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              Add Another
            </button>

            <div className={styles.actionButtons}>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitButton}
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}