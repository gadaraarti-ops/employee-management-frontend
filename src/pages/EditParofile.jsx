import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import Swal from "sweetalert2";

const EditProfile = () => {

    const [profile, setProfile] = useState({
        name:"",
        email:"",
        mobile:"",
        photo:""
    });

    useEffect(() => {
        EmployeeService.getProfile().then((res)=>{
            setProfile(res.data);
        });
    },[]);

    const handleChange=(e)=>{
        setProfile({
            ...profile,
            [e.target.name]:e.target.value
        });
    }

    const updateProfile=()=>{

        EmployeeService.updateProfile(profile).then(()=>{

            Swal.fire({
                icon:"success",
                title:"Profile Updated Successfully"
            });

        });

    }

    return(

        <div className="container mt-4">

            <div className="card shadow p-4">

                <h3>Edit Profile</h3>

                <input
                className="form-control my-2"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Name"/>

                <input
                className="form-control my-2"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Email"/>

                <input
                className="form-control my-2"
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
                placeholder="Mobile"/>

                <button
                className="btn btn-primary mt-3"
                onClick={updateProfile}>

                    Update Profile

                </button>

            </div>

        </div>

    )

}

export default EditProfile;