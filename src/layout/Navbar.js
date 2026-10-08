import React from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import "./navbar.css";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";


const Navbar = () => {
  const logout = () => {

    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Logout"
    }).then((result) => {

        if (result.isConfirmed) {

            localStorage.removeItem("token");

            Swal.fire({
                icon: "success",
                title: "Logged Out",
                text: "You have been successfully logged out.",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {

                window.location.href = "/login";

            });

        }

    });

};
  return (
    <div className="navbar-custom">
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search employees..."
          className="search-input"
        />
      </div>
       
      

      <div className="profile">
        <FaBell className="nav-icon" />
        <FaUserCircle className="profile-icon" />
        <div>
          <h5>Welcome, Admin</h5>
          <small>Employee Management System</small>
        </div>
         <button
    className="btn btn-danger "
     onClick={logout}

>
  Logout
</button>
      </div>
 
    </div>
    

    
  );
};

export default Navbar;