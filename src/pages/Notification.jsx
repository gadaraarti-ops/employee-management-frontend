import React, { useState } from "react";
import "./Notification.css";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBell,
  FaSave
} from "react-icons/fa";

function Notification() {

  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    push: true,
    meeting: true,
    birthday: false,
    company: true
  });

  const handleToggle = (name) => {
    setSettings({
      ...settings,
      [name]: !settings[name]
    });
  };

  const handleSave = () => {
    alert("Notification Settings Saved Successfully");
  };

  return (
    <div className="notification-container">

      <div className="notification-header">

        <button
          className="back-btn"
          onClick={() => navigate("/settings")}
        >
          <FaArrowLeft /> Back
        </button>

        <h2>Notification Settings</h2>

      </div>

      <div className="notification-card">

        <div className="notification-icon">
          <FaBell />
        </div>

        <h3>Manage Notifications</h3>

        <div className="notify-row">
          <span>Email Notifications</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.email}
              onChange={() => handleToggle("email")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notify-row">
          <span>SMS Notifications</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.sms}
              onChange={() => handleToggle("sms")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notify-row">
          <span>Push Notifications</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.push}
              onChange={() => handleToggle("push")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notify-row">
          <span>Meeting Reminders</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.meeting}
              onChange={() => handleToggle("meeting")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notify-row">
          <span>Birthday Wishes</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.birthday}
              onChange={() => handleToggle("birthday")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notify-row">
          <span>Company Announcements</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.company}
              onChange={() => handleToggle("company")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <button
          className="save-notification-btn"
          onClick={handleSave}
        >
          <FaSave /> Save Changes
        </button>

      </div>

    </div>
  );
}

export default Notification;