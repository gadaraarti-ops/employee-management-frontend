 
import { FaUsers, FaUserCheck, FaBuilding, FaChartLine } from "react-icons/fa";
import "./dashboard.css";
import React, {useState,useEffect} from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";
import Navbar from "../layout/Navbar";
import EmployeeService from "../services/EmployeeService";
 
const barData = [
  { month: "Jan", employees: 20 },
  { month: "Feb", employees: 35 },
  { month: "Mar", employees: 40 },
  { month: "Apr", employees: 55 },
  { month: "May", employees: 70 },
  { month: "Jun", employees: 90 }
];

 

const COLORS = ["#0d6efd", "#198754", "#ffc107", "#dc3545"];
 

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    departments: 0,
    growth: "0%"
});
const[pieData,setPieData] =useState([]);
useEffect(() => {
  EmployeeService.getDepartmentChart()
    .then((res) => {

        const chart = Object.keys(res.data).map((key) => ({
            name: key,
            value: res.data[key]
        }));

        setPieData(chart);

    })
    .catch((err) => console.log(err));
    EmployeeService.getDashboardData()
        .then((res) => {
            setDashboard(res.data);
        })
        .catch((err) => console.log(err));
}, []);
 
  return (
    <div>
      {/* Welcome Banner */}
      <div className="banner">
        <div>
          <Navbar/>
          <h2>Welcome, Admin </h2>
          <p>Manage your employees efficiently with Employee Managementa System Project.</p>
        </div>

         
      </div>

      {/* Dashboard Cards */}
      <div className="cards">

        <div className="card-box blue">
          <FaUsers size={35}/>
          <h3>{dashboard.totalEmployees}</h3>
          <p>Total Employees</p>
        </div>

        <div className="card-box green">
          <FaUserCheck size={35}/>
          <h3>{dashboard.activeEmployees}</h3>
          <p>Active Employees</p>
        </div>

        <div className="card-box orange">
          <FaBuilding size={35}/>
          <h3>{dashboard.departments}</h3>
          <p>Departments</p>
        </div>

        <div className="card-box purple">
          <FaChartLine size={35}/>
          <h3>{dashboard.growth}</h3>
          <p>Growth</p>
        </div>

      </div>
      <div className="charts">

  <div className="chart-box">
    <h3>Employee Growth</h3>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={barData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="employees" fill="#0d6efd" />
      </BarChart>
    </ResponsiveContainer>

  </div>

  <div className="chart-box">
    <h3>Department Distribution</h3>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          outerRadius={90}
          label
        >
          {pieData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>

  </div>

</div>
    </div>
    
  );
   
};

export default Dashboard;