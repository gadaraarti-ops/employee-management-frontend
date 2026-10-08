import axios from "axios";
import { data } from "react-router-dom";

const API = "http://localhost:8080/auth";

const login = (data) => {
    return axios.post(API + "/login", data);
};
const register=(data)=>{
    return axios.post(API+"/register",data);
}

export default { login, register };