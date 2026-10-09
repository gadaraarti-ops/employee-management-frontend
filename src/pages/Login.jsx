
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import "./auth.css";

const Login = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLogin((prevLogin) => ({
            ...prevLogin,
            [name]: value,
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (!login.username.trim() || !login.password) {
            alert("Please enter username and password.");
            return;
        }

        setLoading(true);

        AuthService.login(login)
            .then((res) => {
                const token = res.data?.token;

                if (!token) {
                    alert(
                        "Login response मध्ये token मिळाला नाही. Backend response तपासा."
                    );
                    return;
                }

                localStorage.setItem("token", token);

                navigate("/dashboard", { replace: true });
            })
            .catch((error) => {
                console.error("Login error:", error);

                const message =
                    error.response?.data?.message ||
                    "Invalid Username or Password";

                alert(message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="left-panel">
                    <h1>Employee Management System</h1>

                    <img
                        src="/logo.png"
                        alt="Employee Management System logo"
                    />

                    <p>
                        Manage Employees Smartly,
                        Securely and Professionally.
                    </p>

                    <h3>Welcome</h3>
                </div>

                <div className="right-panel">
                    <h2 className="mb-4">Login</h2>

                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>

                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                value={login.username}
                                onChange={handleChange}
                                autoComplete="username"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>

                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={login.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                required
                            />
                        </Form.Group>

                        <Button
                            className="login-btn"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                        <div className="mt-3 text-center">
                            Don't have an account?

                            <Link
                                className="link ms-2"
                                to="/register"
                            >
                                Register
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
 
