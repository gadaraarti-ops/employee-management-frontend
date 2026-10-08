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
import { ThemeProvider } from "../pages/TheamContext";

const AppRoutes = () => {

    return (

        <BrowserRouter>

            <Routes>
                  <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                   

                   <Route path="/register" element={<Register />} />

                   <Route path="/reports" element={<Reports/>}></Route>
                   <Route path="/settings" element={<Settings/>}/>
                   <Route path="/edit-profile" element={<EditProfile/>}/>
                   <Route path="/personalization" element={<Personalization/>}/>
                   <Route path="/change-password" element={<ChangePassword/>}/>
                   <Route path="/email" element={<Email />} />
                   <Route path="/notification" element={<Notification />} />

                <Route path="/" element={<MainLayout />}>

                    <Route index element={<Dashboard />} />

                    <Route path="dashboard" element={<Dashboard />} />
                   
                    <Route
                        path="employees"
                        element={<EmployeeList />}
                    />

                    <Route
                        path="add-employee"
                        element={<AddEmployee />}
                    />

                    <Route
                        path="edit-employee/:id"
                        element={<EditEmployee />}
                    />

                    <Route
                        path="view-employee/:id"
                        element={<ViewEmployee />}
                    />
                    <Route
                        path="*" element={<NotFound></NotFound>}>
                    </Route>

                </Route>

            </Routes>

        </BrowserRouter>

    );

};

export default AppRoutes;