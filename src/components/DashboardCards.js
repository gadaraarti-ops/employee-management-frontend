import React from "react";

function DashboardCards() {
  return (
    <div className="row mb-4">

      <div className="col-md-3">
        <div className="card shadow border-0">
          <div className="card-body text-center">
            <h5>Total Employees</h5>
            <h2 className="text-primary">2</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow border-0">
          <div className="card-body text-center">
            <h5>Departments</h5>
            <h2 className="text-success">2</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow border-0">
          <div className="card-body text-center">
            <h5>Active Employees</h5>
            <h2 className="text-warning">2</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow border-0">
          <div className="card-body text-center">
            <h5>Salary Budget</h5>
            <h2 className="text-danger">₹0</h2>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DashboardCards;