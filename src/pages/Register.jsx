 
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
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
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Password Mismatch",
                text: "Password and Confirm Password must match.",
            });
            return;
        }

        if (user.password.length < 6) {
            Swal.fire({
                icon: "warning",
                title: "Weak Password",
                text: "Password must contain at least 6 characters.",
            });
            return;
        }

        const registrationData = {
            fullName: user.fullName.trim(),
            email: user.email.trim(),
            mobile: user.mobile.trim(),
            username: user.username.trim(),
            password: user.password,
        };

        try {
            setLoading(true);

            await AuthService.register(registrationData);

            await Swal.fire({
                icon: "success",
                title: "Registration Successful",
                text: "Your account has been created. Please login.",
                confirmButtonText: "Go to Login",
            });

            navigate("/login", { replace: true });
        } catch (error) {
            console.error(
                "Registration error:",
                error.response?.status,
                error.response?.data || error.message
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Registration failed. Please check the backend API.";

            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text:
                    typeof message === "string"
                        ? message
                        : "Please check your details and try again.",
            });
        } finally {
            setLoading(false);
        }
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
                                placeholder="Enter full name"
                                autoComplete="name"
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
                                placeholder="Enter email"
                                autoComplete="email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="tel"
                                name="mobile"
                                value={user.mobile}
                                onChange={handleChange}
                                placeholder="Enter mobile number"
                                autoComplete="tel"
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
                                placeholder="Choose username"
                                autoComplete="username"
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
                                placeholder="Create password"
                                autoComplete="new-password"
                                minLength={6}
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
                                placeholder="Confirm password"
                                autoComplete="new-password"
                                minLength={6}
                                required
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            className="w-100"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>

                        <div className="text-center mt-3">
                            Already have an account?

                            <Link to="/login" className="link ms-2">
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
 

 