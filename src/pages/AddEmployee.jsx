import React, { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EmployeeService from "../services/EmployeeService";

const AddEmployee = () => {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        mobile: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: "",
        photo: ""
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };
    const handlePhoto = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

        setEmployee({
            ...employee,
            photo: reader.result
        });

    };

    reader.readAsDataURL(file);

};

    const saveEmployee = (e) => {

        e.preventDefault();

        EmployeeService.saveEmployee(employee)
            .then(() => {

                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Employee Added Successfully!"
                });

                navigate("/employees");

            })
            .catch((err) => {
                console.log(err);
            });

    };

    return (

        <Card className="shadow border-0">

            <Card.Header className="bg-success text-white">
                <h3>Add Employee</h3>
            </Card.Header>

            <Card.Body>

                <Form onSubmit={saveEmployee}>

                    <Row>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="mobile"
                                    value={employee.mobile}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="department"
                                    value={employee.department}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="designation"
                                    value={employee.designation}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Salary</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="salary"
                                    value={employee.salary}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Joining Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="joiningDate"
                                    value={employee.joiningDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Form.Group className="mb-3">
    <Form.Label>Employee Photo</Form.Label>

    <Form.Control
        type="file"
        accept="image/*"
        onChange={handlePhoto}
    />
</Form.Group>

                    <Button
                        type="submit"
                        variant="success"
                        className="me-2"
                    >
                        Save Employee
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => navigate("/employees")}
                    >
                        Back
                    </Button>

                </Form>

            </Card.Body>

        </Card>

    );

};

export default AddEmployee;