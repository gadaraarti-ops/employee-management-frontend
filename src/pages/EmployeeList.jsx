import React, { useEffect, useState } from "react";
import { Table, Button, Card, Form, InputGroup } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa";
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
    const [sortOrder, setSortOrder]= useState("asc");
    const [department, setDepartment] = useState("All");

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = () => {
        EmployeeService.getAllEmployees()
            .then((res) => {
                setEmployees(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const exportToExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(filteredEmployees);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    const data = new Blob(
        [excelBuffer],
        {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        }
    );

    saveAs(data, "Employee_List.xlsx");

};

    const deleteEmployee = (id) => {

        Swal.fire({
            title: "Delete Employee?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes Delete"
        }).then((result) => {

            if (result.isConfirmed) {

                EmployeeService.deleteEmployee(id)
                    .then(() => {

                        Swal.fire(
                            "Deleted!",
                            "Employee Deleted Successfully",
                            "success"
                        );

                        loadEmployees();

                    });

            }

        });

    };
    const exportToPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Employee Management System", 14, 20);

    autoTable(doc, {
        startY: 30,
        head: [[
            "ID",
            "Name",
            "Email",
            "Mobile",
            "Department",
            "Designation",
            "Salary"
        ]],
        body: employees.map(emp => [
            emp.id,
            emp.name,
            emp.email,
            emp.mobile,
            emp.department,
            emp.designation,
            emp.salary
        ])
    });

    doc.save("Employee_List.pdf");
};

      const filteredEmployees = employees.filter((emp) => {
  const matchesSearch =
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase()) ||
    emp.designation.toLowerCase().includes(search.toLowerCase());

  const matchesDepartment =
    department === "All" || emp.department === department;

  return matchesSearch && matchesDepartment;
});
const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
    } else {
        return b.name.localeCompare(a.name);
    }
});

    return (

        <Card className="shadow border-0">

            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">

                <h4>Employee List</h4>

                <Button
                    variant="light"
                    onClick={() => navigate("/add-employee")}
                >
                    <FaPlus /> Add Employee
                </Button>

            </Card.Header>

            <Card.Body>

                <InputGroup className="mb-3">

                    <InputGroup.Text>
                        <FaSearch />
                    </InputGroup.Text>

                    <Form.Control
                        placeholder="Search Employee..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
    className="btn btn-danger ms-2"
    onClick={exportToPDF}
>
    Export PDF
</button>
                     
                         <Form.Select
    style={{ width: "200px" }}
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
>
    <option value="All">All Departments</option>
    <option value="IT">IT</option>
    <option value="HR">HR</option>
    <option value="Sales">Sales</option>
    <option value="Finance">Finance</option>
</Form.Select>
                         <Button
    variant="success"
    onClick={exportToExcel}
>
    Export Excel
</Button>
                         


                </InputGroup>

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

                        {

                            filteredEmployees.map((emp) => (

                                <tr key={emp.id}>

                                    <td>{emp.id}</td>

                                    <td>{emp.name}</td>

                                    <td>{emp.email}</td>
                                    <td>{emp.mobile}</td>

                                    <td>{emp.department}</td>

                                    <td>{emp.designation}</td>

                                    <td>₹ {emp.salary}</td>
                                    <td>

<img
    src={emp.photo}
    alt="Employee"
    width="50"
    height="50"
    style={{
        borderRadius:"50%",
        objectFit:"cover"
    }}
/>

</td>

                                    <td>

                                        <Button
                                            size="sm"
                                            variant="info"
                                            className="me-2"
                                            onClick={() => navigate(`/view-employee/${emp.id}`)}
                                        >
                                            <FaEye />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => navigate(`/edit-employee/${emp.id}`)}
                                        >
                                            <FaEdit />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => deleteEmployee(emp.id)}
                                        >
                                            <FaTrash />
                                        </Button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </Table>

            </Card.Body>

        </Card>
 
    );

    

};

export default EmployeeList;