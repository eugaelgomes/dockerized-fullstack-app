import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Rotas from "./routes/routes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Rotas />
        </div>            
      </AuthProvider>
    </BrowserRouter>
  );
}
