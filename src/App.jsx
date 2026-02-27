import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Travel from "./pages/Travel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Dashboard />} />
        <Route path="travel" element={<Travel />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;