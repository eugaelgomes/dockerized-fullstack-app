import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Rotas from "./routes/routes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App bg-gradient-to-b from-slate-800 to-slate-900 min-h-screen">
          <Rotas />
        </div>            
      </AuthProvider>
    </BrowserRouter>
  );
}
