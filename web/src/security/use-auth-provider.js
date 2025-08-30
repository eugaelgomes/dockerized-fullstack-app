// hooks/useAuthProvider.js
import { useState, useEffect } from "react";
import { decodeToken, createUserService, login as loginService, getCurrentUser, getUsers } from "./auth-services";

export function useAuthProvider(navigate) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("authToken");
  async function checkAuth() {
    if (token) {
      const decoded = decodeToken(token);
      const isValid = decoded && decoded.exp * 1000 > Date.now();

      if (isValid) {
        const userRole = decoded.role_name || decoded.role; // Tenta ambos os campos
        setUser({
          id: decoded.userId,
          username: decoded.username,
          name: decoded.name,
          role: userRole
        });
        setAuthenticated(true);
        
        // Carrega dados do usuário mas não desloga em caso de erro temporário
        loadUserData(token).catch(err => {
          console.warn("Falha ao carregar dados do usuário, mas mantendo sessão:", err);
        });
      } else {
        logout();
      }
    }
    setLoading(false);
  }
  checkAuth();
}, []);

 async function createUser(userData) {
  try {
    const { message } = await createUserService(userData);
    return { 
      success: true, 
      message: message
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.message || "Falha ao criar usuário" 
    };
  }
}


  async function loadUserData(token) {
    try {
      const data = await getCurrentUser(token);
      const userRole = data.role_name || data.role; // Tenta ambos os campos
      setUser((prev) => ({ ...prev, ...data, role: userRole }));
      if (userRole === "admin") {
        try {
          const usersData = await getUsers(token);
          setUsers(usersData);
        } catch (error) {
          console.warn("Falha ao carregar lista de usuários:", error);
        }
      }
    } catch (error) {
      console.warn("Falha ao carregar dados do usuário:", error);
      // Só faz logout se o erro for de autenticação (401)
      if (error.status === 401) {
        logout();
      }
    }
  }

  async function login(credentials) {
    try {
      const { token } = await loginService(credentials);
      localStorage.setItem("authToken", token);
      const decoded = decodeToken(token);
      if (!decoded || decoded.exp * 1000 < Date.now()) throw new Error("Sessão inválida");
      const userRole = decoded.role_name || decoded.role; // Tenta ambos os campos
      setUser({ id: decoded.userId, username: decoded.username, name: decoded.name, role: userRole });
      setAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  function logout() {
    localStorage.removeItem("authToken");
    setAuthenticated(false);
    setUser(null);
    setUsers([]);
    navigate("/");
  }

  return { authenticated, loading, user, users, login, logout, createUser };
}
