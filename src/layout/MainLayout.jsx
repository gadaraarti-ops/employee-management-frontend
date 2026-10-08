import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Navbar";
import { Navbar } from "react-bootstrap";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">

      <Sidebar />

      <div className="main-content">
      <Navbar/>
          <Outlet />
        </div>

      </div>

    
  );
};

export default MainLayout;