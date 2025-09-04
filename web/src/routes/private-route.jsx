import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ roleRequired }) {
  const { authenticated, loading, user } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // ou um loader global
  }

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  if (roleRequired) {
    // Aceita string única ou array de roles
    const allowedRoles = Array.isArray(roleRequired) ? roleRequired : [roleRequired];
    if (!allowedRoles.includes(user?.role)) {
      return <Navigate to="/home" replace />;
    }
  }

  return <Outlet />;
}
