
import React, { useEffect, useState } from "react";
import { Table, Button, Card, Form, InputGroup } from "react-bootstrap";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EmployeeService from "../services/EmployeeService";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [department, setDepartment] = useState("All");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    EmployeeService.getAllEmployees()
      .then((res) => {
        setEmployees(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error loading employees:", err);

        Swal.fire(
          "Error",
          "Unable to load employees. Please try again.",
          "error"
        );
      });
  };

  // Search and department filter
  const filteredEmployees = employees.filter((emp) => {
    const name = (emp.name || "").toLowerCase();
    const email = (emp.email || "").toLowerCase();
    const empDepartment = (emp.department || "").toLowerCase();
    const designation = (emp.designation || "").toLowerCase();
    const searchText = search.toLowerCase();

    const matchesSearch =
      name.includes(searchText) ||
      email.includes(searchText) ||
      empDepartment.includes(searchText) ||
      designation.includes(searchText);

    const matchesDepartment =
      department === "All" || emp.department === department;

    return matchesSearch && matchesDepartment;
  });

  // Sort employees by name
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const nameA = (a.name || "").toLowerCase();
    const nameB = (b.name || "").toLowerCase();

    if (sortOrder === "asc") {
      return nameA.localeCompare(nameB);
    }

    return nameB.localeCompare(nameA);
  });

  // Export to Excel
  const exportToExcel = () => {
    if (sortedEmployees.length === 0) {
      Swal.fire("No Data", "No employees available to export.", "info");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      sortedEmployees.map((emp) => ({
        ID: emp.id,
        Name: emp.name,
        Email: emp.email,
        Mobile: emp.mobile,
        Department: emp.department,
        Designation: emp.designation,
        Salary: emp.salary,
      }))
    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Employees"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "Employee_List.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    if (sortedEmployees.length === 0) {
      Swal.fire("No Data", "No employees available to export.", "info");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Employee Management System", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [
        [
          "ID",
          "Name",
          "Email",
          "Mobile",
          "Department",
          "Designation",
          "Salary",
        ],
      ],
      body: sortedEmployees.map((emp) => [
        emp.id ?? "",
        emp.name ?? "",
        emp.email ?? "",
        emp.mobile ?? "",
        emp.department ?? "",
        emp.designation ?? "",
        emp.salary ?? "",
      ]),
      styles: {
        fontSize: 8,
      },
    });

    doc.save("Employee_List.pdf");
  };

  // Delete employee
  const deleteEmployee = (id) => {
    Swal.fire({
      title: "Delete Employee?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        EmployeeService.deleteEmployee(id)
          .then(() => {
            Swal.fire(
              "Deleted!",
              "Employee deleted successfully.",
              "success"
            );

            loadEmployees();
          })
          .catch((err) => {
            console.error("Error deleting employee:", err);

            Swal.fire(
              "Error",
              "Unable to delete employee. Please try again.",
              "error"
            );
          });
      }
    });
  };

  return (
    <Card className="shadow border-0">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h4 className="mb-0">Employee List</h4>

        <Button
          variant="light"
          onClick={() => navigate("/add-employee")}
        >
          <FaPlus className="me-2" />
          Add Employee
        </Button>
      </Card.Header>

      <Card.Body>
        {/* Search, Department Filter, Sorting and Export */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          <InputGroup style={{ flex: "1 1 220px" }}>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>

            <Form.Control
              type="text"
              placeholder="Search Employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>

          <Form.Select
            style={{ width: "180px" }}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            aria-label="Filter by department"
          >
            <option value="All">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
          </Form.Select>

          <Form.Select
            style={{ width: "180px" }}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            aria-label="Sort employees by name"
          >
            <option value="asc">Name: A to Z</option>
            <option value="desc">Name: Z to A</option>
          </Form.Select>

          <Button variant="danger" onClick={exportToPDF}>
            Export PDF
          </Button>

          <Button variant="success" onClick={exportToExcel}>
            Export Excel
          </Button>
        </div>

        {/* Employee Table */}
        <Table bordered hover responsive striped>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedEmployees.length > 0 ? (
              sortedEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.mobile}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>₹ {emp.salary}</td>

                  <td>
                    {emp.photo ? (
                      <img
                        src={emp.photo}
                        alt={`${emp.name || "Employee"} profile`}
                        width="50"
                        height="50"
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span>No Photo</span>
                    )}
                  </td>

                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="info"
                        title="View Employee"
                        aria-label={`View ${emp.name}`}
                        onClick={() =>
                          navigate(`/view-employee/${emp.id}`)
                        }
                      >
                        <FaEye />
                      </Button>

                      <Button
                        size="sm"
                        variant="warning"
                        title="Edit Employee"
                        aria-label={`Edit ${emp.name}`}
                        onClick={() =>
                          navigate(`/edit-employee/${emp.id}`)
                        }
                      >
                        <FaEdit />
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        title="Delete Employee"
                        aria-label={`Delete ${emp.name}`}
                        onClick={() => deleteEmployee(emp.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <p className="text-muted mb-0">
          Total Employees: {sortedEmployees.length}
        </p>
      </Card.Body>
    </Card>
  );
};

export default EmployeeList;
 
