import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import EmployeeService from "../services/EmployeeService";

const EditEmployee = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [employee, setEmployee] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: ""
    });

    useEffect(() => {
        EmployeeService.getEmployee(id)
            .then((res) => {
                setEmployee(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const updateEmployee = (e) => {
        e.preventDefault();

        EmployeeService.updateEmployee(employee)
            .then(() => {

                Swal.fire({
                    icon: "success",
                    title: "Updated Successfully",
                    text: "Employee details updated."
                });

                navigate("/employees");

            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (

        <Card className="shadow border-0">

            <Card.Header className="bg-warning text-dark">
                <h3>Edit Employee</h3>
            </Card.Header>

            <Card.Body>

                <Form onSubmit={updateEmployee}>

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
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={employee.phone}
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

                    <Button
                        type="submit"
                        variant="warning"
                        className="me-2"
                    >
                        Update Employee
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => navigate("/employees")}
                    >
                        Cancel
                    </Button>

                </Form>

            </Card.Body>

        </Card>

    );

};

export default EditEmployee;