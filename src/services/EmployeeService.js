
import axios from "axios";

const API = "https://employee-management-system-0i07.onrender.com";

class EmployeeService {
    getAllEmployees() {
        return axios.get(`${API}/employee/all`);
    }

    getEmployee(id) {
        return axios.get(`${API}/employee/${id}`);
    }

    saveEmployee(employee) {
        return axios.post(`${API}/employee/save`, employee);
    }

    updateEmployee(employee) {
        return axios.put(`${API}/employee/update`, employee);
    }

    deleteEmployee(id) {
        return axios.delete(`${API}/employee/delete/${id}`);
    }

    searchEmployee(name) {
        return axios.get(`${API}/employee/search/${encodeURIComponent(name)}`);
    }

    getDashboardData() {
        return axios.get(`${API}/employee/dashboard`);
    }

    getDepartmentChart() {
        return axios.get(`${API}/employee/department-chart`);
    }

    getProfile() {
        return axios.get(`${API}/profile`);
    }

    updateProfile(profile) {
        return axios.put(`${API}/profile`, profile);
    }

    changePassword(data) {
        return axios.put(`${API}/profile/change-password`, data);
    }
}

const employeeService = new EmployeeService();

export default employeeService;
 
