

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "./services/EmployeeService";

const EmployeeForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL मधून ID मिळवण्यासाठी

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        status: "Active"
    });

    // जर URL मध्ये ID असेल, तर आधी डेटा लोड करणे (Edit Mode)
    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id)
                .then((response) => {
                    setEmployee(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching employee details:", error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        if (id) {
            // Update करताना तुमच्या API नुसार (फक्त employee ऑब्जेक्ट पाठवायचा आहे)
            // आपण खात्री करूया की ऑब्जेक्टमध्ये योग्य id सेट आहे
            const updatedEmployee = { ...employee, id: id };
            EmployeeService.updateEmployee(updatedEmployee)
                .then(() => {
                    navigate("/employees");
                })
                .catch((error) => console.log("Error updating:", error));
        } else {
            // Save करताना तुमच्या API मधील 'saveEmployee' फंक्शन वापरले आहे
            EmployeeService.saveEmployee(employee)
                .then(() => {
                    navigate("/employees");
                })
                .catch((error) => console.log("Error saving:", error));
        }
    };

    return (
        <div className="container mt-5">
            <div className="card col-md-6 offset-md-3 shadow border-0">
                <h3 className="text-center mt-4">
                    {id ? "Update Employee" : "Add New Employee"}
                </h3>
                <div className="card-body">
                    <form onSubmit={saveOrUpdateEmployee}>
                        <div className="form-group mb-3">
                            <label className="form-label">Full Name:</label>
                            <input
                                type="text" placeholder="Enter Full Name" name="name"
                                className="form-control" value={employee.name || ""} onChange={handleChange} required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Email ID:</label>
                            <input
                                type="email" placeholder="Enter Email Address" name="email"
                                className="form-control" value={employee.email || ""} onChange={handleChange} required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Phone:</label>
                            <input
                                type="text" placeholder="Enter Phone Number" name="phone"
                                className="form-control" value={employee.phone || ""} onChange={handleChange} required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Department:</label>
                            <select
                                name="department" className="form-select"
                                value={employee.department || ""} onChange={handleChange} required
                            >
                                <option value="">Select Department</option>
                                <option value="IT">IT</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Designation:</label>
                            <input
                                type="text" placeholder="e.g. Developer" name="designation"
                                className="form-control" value={employee.designation || ""} onChange={handleChange} required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Salary (₹):</label>
                            <input
                                type="number" placeholder="Enter Salary" name="salary"
                                className="form-control" value={employee.salary || ""} onChange={handleChange} required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Status:</label>
                            <select
                                name="status" className="form-select"
                                value={employee.status || "Active"} onChange={handleChange}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <button type="submit" className="btn btn-success px-4">Save</button>
                            <button type="button" className="btn btn-danger px-4" onClick={() => navigate("/employees")}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeForm;