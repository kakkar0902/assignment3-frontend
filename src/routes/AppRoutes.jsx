import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Travel from "../pages/Travel";
import AddTravel from "../pages/AddTravel";
import TravelDetails from "../pages/TravelDetails";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
  path="/*"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="travel" element={<Travel />} />
        <Route path="travel/add" element={<AddTravel />} />
        <Route path="travel/edit/:id" element={<AddTravel />} />
        <Route path="travel/view/:id" element={<TravelDetails />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;