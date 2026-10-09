  
import axios from "axios";

const API = "https://employee-management-system-0i07.onrender.com/auth";

const login = (data) => {
    return axios.post(`${API}/login`, data);
};

const register = (data) => {
    return axios.post(`${API}/register-user`, data);
};

const AuthService = {
    login,
    register
};

export default AuthService;
 
