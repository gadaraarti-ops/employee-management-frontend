import React from "react";
import {
 FaUserCircle,
 FaPalette,
 FaLock,
 FaEnvelope,
 FaBell,
 FaMoon,
 FaSignOutAlt,
 FaChevronRight
} from "react-icons/fa";

import "./settings.css";
import { useNavigate } from "react-router-dom";

 

const Settings = () => {
  const navigate=useNavigate();
  return (
    <div className="settings-page">
       

      <div className="profile-card">
        <div className="setting-item" onClick={()=> navigate("/edit-profile")}/>

        <div className="profile-image">
          <FaUserCircle size={90}/>
          <button className="edit-btn">✏️</button>
        </div>

        <h2>Aarti Gadar</h2>
        <p>Employee Management System</p>

      </div>

      <div className="settings-list">

        <>
            <div
                className="setting-item"
                onClick={() => navigate("/personalization")}
            >
                <FaPalette />
                <span>Personalization</span>
                <FaChevronRight />
            </div>
        </>

        <div
    className="setting-item"
    onClick={() => navigate("/change-password")}
>
    <FaLock />
    <span>Change Password</span>
    <FaChevronRight />
</div>
                     <div
    className="setting-item"
    onClick={() => navigate("/email")}
>
    <div className="setting-left">

        <FaEnvelope className="setting-icon" />

        <span>Email</span>

    </div>

    <FaChevronRight className="arrow-icon" />

</div>
         <div
    className="setting-item"
    onClick={() => navigate("/notification")}
>
    <div className="setting-left">
        <FaBell className="setting-icon" />
        <span>Notifications</span>
    </div>

    <FaChevronRight className="arrow-icon" />
</div>

        <div className="setting-item">
          <FaMoon />
          <span>Dark Mode</span>
          <FaChevronRight />
        </div>

        <div className="setting-item logout">
          <FaSignOutAlt />
          <span>Logout</span>
          <FaChevronRight />
        </div>

      </div>

    </div>
  );
};

export default Settings;