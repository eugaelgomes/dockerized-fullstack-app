import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // ou um loader global
  }

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
