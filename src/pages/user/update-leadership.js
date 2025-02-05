import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/UpdateLeadership.module.css"; // Import CSS module

const InputField = ({ name, type, placeholder, value, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={styles.inputField} // Use CSS module class
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

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Update Leadership</h2>
      <form onSubmit={handleSubmit}>
        {leadership.map((lead, index) => (
          <div key={index} className={styles.leadershipEntry}>
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

            <button
              type="button"
              onClick={() => handleDelete(index)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}

        <button type="button" onClick={addLeadership} className={styles.addButton}>
          Add New Leadership
        </button>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
