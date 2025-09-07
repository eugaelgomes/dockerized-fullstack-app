// services/authService.js
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../config/api";

export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export async function createUserService(data) {
  const response = await fetch(`${API_BASE_URL}/users/create-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
    message: text,
  };
}

export async function login(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error(await response.text());
  return await response.json();
}

export async function getUserData(token) {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Response not ok:", response);
  }

  return data;
}

export async function updateUserData(token, userData) {
  // Envia os dados exatamente como vêm do componente, já que agora usamos os mesmos nomes de campos
  const response = await fetch(`${API_BASE_URL}/auth/me/update-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  const data = await response.json();
  
  // Mapeia a resposta de volta para o formato esperado pelo frontend
  return {
    name: data.full_name,
    email: data.email,
    username: data.username,
    role: data.role_name,
  };
}

export async function updatePassword(token, currentPassword, newPassword) {
  const response = await fetch(`${API_BASE_URL}/auth/me/update-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return await response.json();
}

export async function getUsers(token) {
  const response = await fetch(`${API_BASE_URL}/auth/users`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Falha ao buscar usuários");
  return await response.json();
}

export async function requestPasswordRecovery(email) {
  const response = await fetch(`${API_BASE_URL}/password/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) throw new Error(await response.text());
}

export async function resetPassword(token, password) {
  const response = await fetch(`${API_BASE_URL}/password/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  if (!response.ok) throw new Error(await response.text());
}