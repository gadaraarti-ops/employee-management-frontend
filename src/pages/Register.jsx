import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthService from "../services/AuthService";
import "./auth.css";

const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        mobile: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = (e) => {

        e.preventDefault();

        if (user.password !== user.confirmPassword) {

            Swal.fire({
                icon: "error",
                title: "Password Mismatch"
            });

            return;
        }

        AuthService.register(user)
            .then(() => {

                Swal.fire({
                    icon: "success",
                    title: "Registration Successful"
                });

                navigate("/login");

            })
            .catch(() => {

                Swal.fire({
                    icon: "error",
                    title: "Registration Failed"
                });

            });
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <div className="left-panel">

                    <h1>Employee Management System</h1>

                    <p>Create your account to continue.</p>

                </div>

                <div className="right-panel">

                    <h2 className="mb-4">Register</h2>

                    <Form onSubmit={handleRegister}>

                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={user.fullName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="text"
                                name="mobile"
                                value={user.mobile}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={user.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            className="w-100"
                        >
                            Register
                        </Button>

                        <div className="text-center mt-3">

                            Already have an account?

                            <Link
                                to="/login"
                                className="link ms-2"
                            >
                                Login
                            </Link>

                        </div>

                    </Form>

                </div>

            </div>

        </div>

    );

};

export default Register;