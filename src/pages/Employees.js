import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import "./employee.css";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    
    const loadEmployees = () => {
        EmployeeService.getAllEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.log("Error loading employees:", error);
            });
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    // कर्मचारी डिलीट करण्याचे फंक्शन
    const deleteEmployee = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            EmployeeService.deleteEmployee(id)
                .then(() => {
                    loadEmployees(); // डिलीट झाल्यावर लिस्ट रीलोड करणे
                })
                .catch((error) => {
                    console.log("Error deleting employee:", error);
                });
        }
    };

    return (
        <div className="container mt-4">
            <div className="employee-header d-flex justify-content-between align-items-center mb-3">
                <h2>Employee Management</h2>
                <Link to="/add-employee" className="btn btn-primary">
                    <FaPlus /> Add Employee
                </Link>
            </div>

            <table className="table table-striped table-hover shadow">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Action</th>
                        <th>Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.department}</td>
                            <td>₹ {emp.salary}</td>
                            <td>
                                <button className="btn btn-info btn-sm me-2">
                                    <FaEye />
                                </button>
                                {/* Edit वर क्लिक केल्यावर URL वर आयडीसह जाणे */}
                                <button 
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => navigate(`/edit-employee/${emp.id}`)}
                                >
                                    <FaEdit />
                                </button>
                                {/* Delete वर क्लिक केल्यावर delete function कॉल करणे */}
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteEmployee(emp.id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;