// context/AuthContext.js
import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "./use-auth-provider";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const auth = useAuthProvider(navigate);

  return (
    <AuthContext.Provider value={auth}>
      {!auth.loading ? children : <div>Carregando...</div>}
    </AuthContext.Provider>
  );
}
