import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaPhone, FaBuilding, FaUserTie, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import EmployeeService from "../services/EmployeeService";

const ViewEmployee = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [employee, setEmployee] = useState({});

    useEffect(() => {
        EmployeeService.getEmployee(id)
            .then((response) => {
                setEmployee(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (

        <Card className="shadow border-0">

            <Card.Header className="shadow p-4">
                <h3>Employee Details</h3>
            </Card.Header>

            <Card.Body>

                <div className="text-center mb-4">
                    <FaUserCircle size={120} color="#0d6efd" />
                    <h3 className="mt-3">{employee.name}</h3>
                    <p className="text-muted">{employee.designation}</p>
                </div>

                <Row>

                    <Col md={6} className="mb-3">
                        <FaEnvelope className="me-2 text-primary" />
                        <strong>Email :</strong> {employee.email}
                    </Col>

                    <Col md={6} className="mb-3">
                        <FaPhone className="me-2 text-success" />
                        <strong>Phone :</strong> {employee.phone}
                    </Col>

                    <Col md={6} className="mb-3">
                        <FaBuilding className="me-2 text-warning" />
                        <strong>Department :</strong> {employee.department}
                    </Col>

                    <Col md={6} className="mb-3">
                        <FaUserTie className="me-2 text-danger" />
                        <strong>Designation :</strong> {employee.designation}
                    </Col>

                    <Col md={6} className="mb-3">
                        <FaMoneyBillWave className="me-2 text-success" />
                        <strong>Salary :</strong> ₹ {employee.salary}
                    </Col>

                    <Col md={6} className="mb-3">
                        <FaCalendarAlt className="me-2 text-secondary" />
                        <strong>Joining Date :</strong> {employee.joiningDate}
                    </Col>
                     <img src="{emp.photo}"
                    alt="Employee"
                     
                    style={{borderRadius:"50%"}}/>

                    
                </Row>
                
                

                <div className="text-center mt-4">

                    <Button
                        variant="primary"
                        onClick={() => navigate("/employees")}
                    >
                        Back to Employee List
                    </Button>

                </div>

            </Card.Body>

        </Card>

    );

};

export default ViewEmployee;