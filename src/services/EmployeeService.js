import axios from "axios";

const API = "http://localhost:8080/employee";

class EmployeeService {
    

    getAllEmployees() {
        return axios.get(`${API}/all`);
    }

    getEmployee(id) {
        return axios.get(`${API}/${id}`);
    }

    saveEmployee(employee) {
        return axios.post(`${API}/save`, employee);
    }

    updateEmployee(employee) {
        return axios.put(`${API}/update`, employee);
    }

    deleteEmployee(id) {
        return axios.delete(`${API}/delete/${id}`);
    }

    searchEmployee(name) {
        return axios.get(`${API}/search/${name}`);
    }
     
    getDashboardData() {
    return axios.get(API + "/dashboard");
    }
    getDepartmentChart() {
    return axios.get(API + "/department-chart");

}
getProfile(){
    return axios.get("http://localhost:8080/profile");
}

updateProfile(profile){
    return axios.put("http://localhost:8080/profile",profile);
}
changePassword(data){
    return axios.put(
        "http://localhost:8080/profile/change-password",
        data
    );
}

}
 

export default new EmployeeService();