import React, { useState } from "react";
import "./Personalization.css";
import {
  FaPalette,
  FaLanguage,
  FaTextHeight,
  FaSave,
  FaArrowLeft
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Personalization() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("Light");
  const [language, setLanguage] = useState("English");
  const [fontSize, setFontSize] = useState("Medium");

  const handleSave = () => {
    alert("Personalization Saved Successfully");
  };

  return (
    <div className="personalization-page">

      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate("/settings")}>
          <FaArrowLeft /> Back
        </button>

        <h2>Personalization</h2>
      </div>

      <div className="setting-card">

        <div className="setting-row">
          <div className="left">
            <FaPalette className="icon" />
            <span>Theme</span>
          </div>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>

        <div className="setting-row">
          <div className="left">
            <FaLanguage className="icon" />
            <span>Language</span>
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
          </select>
        </div>

        <div className="setting-row">
          <div className="left">
            <FaTextHeight className="icon" />
            <span>Font Size</span>
          </div>

          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>

        <button className="save-btn" onClick={handleSave}>
          <FaSave />
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default Personalization;