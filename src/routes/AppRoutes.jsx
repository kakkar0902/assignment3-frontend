import { Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import UserRoles from '../pages/UserRoles';
import UserManagement from '../pages/UserManagement';
import Dashboard from '../pages/Dashboard';
import AutoResponse from '../pages/AutoResponse';
import Customers from '../pages/Customers';
import Subscriptions from '../pages/Subscriptions';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/admin/home" replace />} />
    <Route path="/admin" element={<Navigate to="/admin/home" replace />} />
    <Route path="/admin" element={<App />} >
      <Route path="home" element={<Dashboard />} />
      <Route path="user-roles" element={<UserRoles />} />
      <Route path="user-management" element={<UserManagement />} />
      <Route path="auto-response" element={<AutoResponse />} />
      <Route path="customers" element={<Customers />} />
      <Route path="subscriptions" element={<Subscriptions />} />
    </Route>
  </Routes>
);

export default AppRoutes;