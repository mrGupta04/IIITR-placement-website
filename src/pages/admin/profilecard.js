import React, { useState } from 'react';
import Update from './update';

const AdminProfileCard = ({ Admin, handleLogout }) => {
  const [update, setUpdate] = useState(false);
  const [adminData, setAdminData] = useState(Admin);

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleUpdateSuccess = (updatedAdmin) => {
    if (updatedAdmin) {
      setAdminData(updatedAdmin);
      localStorage.setItem("Admin", JSON.stringify(updatedAdmin)); // Update localStorage
    }
    setUpdate(false);
  };

  console.log("AdminProfileCard received:", adminData); // Debugging

  return (
    <div className="profile-card">
      <h2>Admin Profile</h2>
      {adminData ? (
        <>
          {/* Profile Picture */}
          <div>
            {adminData.profilepic ? (
              <img src={adminData.profilepic} alt="Profile" className="profile-img" />
            ) : (
              <img
                src="https://via.placeholder.com/150"
                alt="Default Profile"
                className="profile-img"
              />
            )}
          </div>

          {/* Admin Details */}
          <p><strong>Name:</strong> {adminData.name || "N/A"}</p>
          <p><strong>Email:</strong> {adminData.email || "N/A"}</p>
          <p><strong>Mobile No:</strong> {adminData.mobileno || "N/A"}</p>
          <p><strong>Company:</strong> {adminData.aboutCompany || "N/A"}</p>
          <p><strong>Industry Type:</strong> {adminData.industryType || "N/A"}</p>
          <p><strong>City:</strong> {adminData.city || "N/A"}</p>
          <p><strong>State:</strong> {adminData.state || "N/A"}</p>
          <p><strong>Admin ID:</strong> {adminData.id || "N/A"}</p>

          {/* Website */}
          <p>
            <strong>Website:</strong>{" "}
            {adminData.website ? (
              <a href={adminData.website} target="_blank" rel="noopener noreferrer">
                {adminData.website}
              </a>
            ) : (
              "N/A"
            )}
          </p>

          {/* Logo */}
          <div>
            {adminData.logo ? (
              <a href={adminData.logo} target="_blank" rel="noopener noreferrer">
                <button>View Logo</button>
              </a>
            ) : (
              <p>No Logo uploaded</p>
            )}
          </div>

          {/* Buttons */}
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>

          {/* Update Form */}
          {update && <Update Admin={adminData} onUpdateSuccess={handleUpdateSuccess} />}
        </>
      ) : (
        <p>Loading admin profile...</p>
      )}
    </div>
  );
};

export default AdminProfileCard;
