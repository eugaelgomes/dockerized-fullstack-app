import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./private-route";
//import AdminRoute from "./admin-route";

// Páginas
import Login from "../public/sign-in";
import SignUp from "../public/sign-up";
import Dashboard from "../pages/home";
import NotFoundRoute from "../components/404NotFound";
import UserPanel from "../pages/admin/users";
import UserCreatePage from "../pages/admin/create-user";
import Navbar from "../components/navbar";
//import Sidebar from "../components/sidebar";

// Layout componente para páginas privadas
const PrivateLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-1 flex-col md:flex-row">{children}</main>
    </div>
  );
};

export default function Rotas() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Rotas privadas (usuário logado) */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={
          <PrivateLayout>
            <Dashboard />
          </PrivateLayout>
        } />
      </Route>

      <Route element={<PrivateRoute roleRequired="admin" />}>
        <Route path="/admin/users" element={
          <PrivateLayout>
            <UserPanel />
          </PrivateLayout>
        } />
        <Route path="/admin/create-user" element={
          <PrivateLayout>
            <UserCreatePage />
          </PrivateLayout>
        } />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFoundRoute />} />
    </Routes>
  );
}
