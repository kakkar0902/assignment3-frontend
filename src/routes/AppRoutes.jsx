import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";

import Dashboard from "../pages/Dashboard";
import UserRoles from "../pages/UserRoles";
import UserManagement from "../pages/UserManagement";
import AutoResponse from "../pages/AutoResponse";
import Customers from "../pages/Customers";
import Subscriptions from "../pages/Subscriptions";
import Books from "../pages/Books";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/admin/home" replace />} />
    <Route path="/admin" element={<App />}>
      <Route path="home" element={<Dashboard />} />
      <Route path="user-roles" element={<UserRoles />} />
      <Route path="user-management" element={<UserManagement />} />
      <Route path="auto-response" element={<AutoResponse />} />
      <Route path="customers" element={<Customers />} />
       <Route index element={<CustomersTable />} />
       <Route path="add" element={<AddCustomersForm />} />
       </Route>
      <Route path="subscriptions" element={<Subscriptions />} />
      <Route path="books" element={<Books />} />
   
  </Routes>
);

export default AppRoutes;
