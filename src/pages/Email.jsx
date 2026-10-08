import React, { useState } from "react";
import "./Email.css";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaEnvelope,
  FaCheckCircle,
  FaBell,
  FaSave
} from "react-icons/fa";

function Email() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("aarti@gmail.com");
  const [notification, setNotification] = useState(true);

  const handleSave = () => {
    alert("Email Updated Successfully");
  };

  return (
    <div className="email-container">

      <div className="email-header">

        <button
          className="back-button"
          onClick={() => navigate("/settings")}
        >
          <FaArrowLeft /> Back
        </button>

        <h2>Email Settings</h2>

      </div>

      <div className="email-card">

        <div className="email-icon">
          <FaEnvelope />
        </div>

        <h3>Primary Email Address</h3>

        <p className="sub-title">
          Update your email address and notification preferences.
        </p>

        <div className="form-group">

          <label>Email Address</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        <div className="verified">

          <FaCheckCircle />

          <span>Verified Email</span>

        </div>

        <div className="notification-section">

          <div className="left-side">

            <FaBell />

            <span>Email Notifications</span>

          </div>

          <label className="switch">

            <input
              type="checkbox"
              checked={notification}
              onChange={() =>
                setNotification(!notification)
              }
            />

            <span className="slider"></span>

          </label>

        </div>

        <button
          className="save-btn"
          onClick={handleSave}
        >
          <FaSave />

          Save Changes

        </button>

      </div>

    </div>
  );
}

export default Email;