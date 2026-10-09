
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import EmployeeList from "../pages/EmployeeList";
import AddEmployee from "../pages/AddEmployee";
import EditEmployee from "../pages/EditEmployee";
import ViewEmployee from "../pages/ViewEmployee";
import NotFound from "../components/common/NotFound";

import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import EditProfile from "../pages/EditParofile";
import Personalization from "../pages/Personalization";
import ChangePassword from "../pages/ChangePassword";
import Email from "../pages/Email";
import Notification from "../pages/Notification";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="edit-employee/:id" element={<EditEmployee />} />
          <Route path="view-employee/:id" element={<ViewEmployee />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="personalization" element={<Personalization />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="email" element={<Email />} />
          <Route path="notification" element={<Notification />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
 
