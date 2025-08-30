import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import Navbar from "../../components/navbar";

// Definição das funções disponíveis
const USER_ROLES = [
  { value: "user", label: "Usuário" },
  { value: "admin", label: "Administrador" },
];

export default function UserCreatePage() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "", // Começa sem nenhuma função selecionada
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!newUser.role) {
      alert("Por favor, selecione uma função!");
      return;
    }

    const response = await fetch("/auth/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      alert("Usuário criado com sucesso!");
      navigate("/usuarios"); // Redireciona para a lista de usuários após criação
    } else {
      alert("Erro ao criar usuário");
    }
  };

  return (
        <div className="flex-1 flex flex-col p-4 space-y-4">
          <div id="header" className="bg-gray-300/50 p-1 rounded-sm text-center shadow-md">
            <h2 className="text-black text-2xl font-bold">Gerência de Usuários</h2>
          </div>
          <form onSubmit={handleCreateUser} className="bg-gray-300/50 p-4 rounded-sm shadow-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Usuário"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="Senha"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                required
                className="w-full p-2 border rounded text-gray-500"
              >
                <option value="" disabled>Função</option>
                {USER_ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/usuarios")}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Criar Usuário
              </button>
            </div>
          </form>
        </div>
  );
}
