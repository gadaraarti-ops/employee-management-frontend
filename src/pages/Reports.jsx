import React from "react";

const Reports = () => {
  return (
    <div className="container mt-4">
      <h2>Employee Reports</h2>

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5>Total Employees</h5>
              <h3>0</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5>Active Employees</h5>
              <h3>0</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <h5>Departments</h5>
              <h3>0</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h5>Monthly Growth</h5>
              <h3>18%</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;