import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaChartBar,
  FaCog
} from "react-icons/fa";
import "./layout.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>EMS Pro</h2>
        <p>Employee Management</p>
      </div>

      <ul className="menu">
        <li>
          <NavLink to="/">
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/employees">
            <FaUsers /> Employees
          </NavLink>
        </li>

        <li>
          <NavLink to="/add-employee">
            <FaUserPlus /> Add Employee
          </NavLink>
        </li>

        <li>
          <NavLink to="/reports">
            <FaChartBar /> Reports
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings">
            <FaCog /> Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;