 import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./layout.css";

function layout({ children }) {
  return (
    <div>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <main className="content-area">
          {children}
        </main>
      </div>

    </div>
  );
}

export default layout;