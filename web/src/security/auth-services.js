// services/authService.js
import { jwtDecode } from "jwt-decode";

export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export async function createUserService(data) {
  const response = await fetch("/api/users/create-account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const text = await response.text();
  
  if (!response.ok) {
    // Tenta parsear como JSON em caso de erro
    try {
      const errorJson = JSON.parse(text);
      throw new Error(errorJson.message || "Falha ao criar usuário");
    } catch {
      throw new Error(text || "Falha ao criar usuário");
    }
  }

  // Se for sucesso, retorna um objeto com a mensagem
  return {
    message: text
  };
}


export async function login(credentials) {
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error(await response.text());
  return await response.json();
}

export async function getCurrentUser(token) {
  const response = await fetch("/auth/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Falha ao buscar usuário");
  return await response.json();
}

export async function getUsers(token) {
  const response = await fetch("/auth/users", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Falha ao buscar usuários");
  return await response.json();
}

export async function requestPasswordRecovery(email) {
  const response = await fetch("/api/password/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) throw new Error(await response.text());
}

export async function resetPassword(token, password) {
  const response = await fetch("/api/password/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  if (!response.ok) throw new Error(await response.text());
}
