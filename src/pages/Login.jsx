import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import "./auth.css";
import { Link } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = (e) => {

        e.preventDefault();

        AuthService.login(login)
            .then((res) => {

                localStorage.setItem("token", res.data.token);

                navigate("/dashboard");

            })
            .catch(() => {
                alert("Invalid Username or Password");
            });
    };

    return (
         <div className="auth-container">

<div className="auth-card">

<div className="left-panel">

<h1>Employee Management System</h1>
<img src="logo.png" alt="Login illustration"></img>
<p>
Manage Employees Smartly,
Securely and Professionally.
</p>

<h3>Welcome</h3>

</div>

<div className="right-panel">

<h2 className="mb-4">
Login
</h2>

<Form onSubmit={handleLogin}>

<Form.Group className="mb-3">

<Form.Label>Username</Form.Label>

<Form.Control
type="text"
name="username"
onChange={handleChange}
/>

</Form.Group>

<Form.Group className="mb-3">

<Form.Label>Password</Form.Label>

<Form.Control
type="password"
name="password"
onChange={handleChange}
/>

</Form.Group>

<Button
className="login-btn"
type="submit">

Login

</Button>

<div className="mt-3 text-center">

Don't have an account?

<Link
className="link ms-2"
to="/register">

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