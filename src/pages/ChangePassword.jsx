import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import "./ChangePassword.css";
import EmployeeService from "../services/EmployeeService";

const ChangePassword = () => {

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const getStrength = () => {
        const password = form.newPassword;

        if (password.length < 6) {
            return {
                width: "25%",
                color: "bg-danger",
                text: "Weak"
            };
        }

        if (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password)
        ) {
            return {
                width: "70%",
                color: "bg-warning",
                text: "Medium"
            };
        }

        if (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[!@#$%^&*]/.test(password)
        ) {
            return {
                width: "100%",
                color: "bg-success",
                text: "Strong"
            };
        }

        return {
            width: "40%",
            color: "bg-danger",
            text: "Weak"
        };
    };

    const strength = getStrength();

    const updatePassword = () => {

        if (form.newPassword !== form.confirmPassword) {

            Swal.fire({
                icon: "error",
                title: "Passwords do not match"
            });

            return;
        }

        EmployeeService.changePassword(form)
            .then(() => {

                Swal.fire({
                    icon: "success",
                    title: "Password Updated Successfully"
                });

                setForm({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });

            })
            .catch(() => {

                Swal.fire({
                    icon: "error",
                    title: "Old Password Incorrect"
                });

            });

    };

    return (

        <div className="password-page">

            <div className="password-card">

                <div className="password-header">

                    <div className="lock-circle">

                        <FaLock />

                    </div>

                    <h2>Change Password</h2>

                    <p>
                        Keep your account secure by updating your password regularly.
                    </p>

                </div>

                <label>Current Password</label>

                <div className="input-group mb-3">

                    <input
                        type={showOld ? "text" : "password"}
                        className="form-control"
                        placeholder="Current Password"
                        name="oldPassword"
                        value={form.oldPassword}
                        onChange={handleChange}
                    />

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setShowOld(!showOld)}
                    >
                        {showOld ? <FaEyeSlash /> : <FaEye />}
                    </button>

                </div>

                <label>New Password</label>

                <div className="input-group mb-3">

                    <input
                        type={showNew ? "text" : "password"}
                        className="form-control"
                        placeholder="New Password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                    />

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setShowNew(!showNew)}
                    >
                        {showNew ? <FaEyeSlash /> : <FaEye />}
                    </button>

                </div>

                <div className="progress mb-3">

                    <div
                        className={`progress-bar ${strength.color}`}
                        style={{ width: strength.width }}
                    >
                        {strength.text}
                    </div>

                </div>

                <label>Confirm Password</label>

                <div className="input-group mb-3">

                    <input
                        type={showConfirm ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setShowConfirm(!showConfirm)}
                    >
                        {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>

                </div>

                {form.confirmPassword !== "" && (

                    form.confirmPassword === form.newPassword ?

                        <p className="text-success">
                            ✔ Password Matched
                        </p>

                        :

                        <p className="text-danger">
                            ✖ Password Not Matched
                        </p>

                )}

                <ul className="rules">

                    <li>✔ Minimum 8 Characters</li>
                    <li>✔ One Uppercase Letter</li>
                    <li>✔ One Number</li>
                    <li>✔ One Special Character</li>

                </ul>

                <div className="text-end">

                    <button
                        className="btn btn-primary"
                        onClick={updatePassword}
                    >
                        Update Password
                    </button>

                </div>

            </div>

        </div>

    );

};

export default ChangePassword;