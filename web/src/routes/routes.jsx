import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./private-route";
//import AdminRoute from "./admin-route";

// Páginas
import Login from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import Dashboard from "../pages/home";
import NotFoundRoute from "../components/404NotFound";
import Navbar from "../components/navbar";
import Settings from "../pages/settings"
import Footer from "../components/footer";

// Layout componente para páginas privadas
const PrivateLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-1 flex-col md:flex-row">{children}</main>
      <Footer />
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
        <Route
          path="/home"
          element={
            <PrivateLayout>
              <Dashboard />
            </PrivateLayout>
          }
        />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route
          path="/settings"
          element={
            <PrivateLayout>
              <Settings />
            </PrivateLayout>
          }
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFoundRoute />} />
    </Routes>
  );
}
