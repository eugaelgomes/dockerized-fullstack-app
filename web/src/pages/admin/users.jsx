import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import Navbar from "../../components/navbar";
import { useAuth } from "../../security/AuthContext";

export default function UserPanel() {
  const { user, users, fetchUsers } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const itemsPerPage = 10;

  // 🚀 Busca usuários ao abrir a página
  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  if (user?.role !== "admin") {
    return <div>Acesso negado</div>;
  }

  const filteredUsers = (users || [])
    .filter((u) => u.nome?.trim() && u.email?.trim()) // Verifica se nome e email existem
    .filter((u) =>
      (u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.nome.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter ? u.role === roleFilter : true)
    );

  const paginatedUsers = filteredUsers.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  const uniqueRoles = [...new Set((users || []).map((u) => u.role).filter(Boolean))];

  const openModal = (type, user) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 flex-col md:flex-row">
        <main className="flex-1 flex flex-col p-4 space-y-4 h-screen">
          <div id="header" className="bg-gray-300/50 p-1 rounded-sm text-center shadow-md">
            <h2 className="text-black text-2xl font-bold">Gerência de Usuários</h2>
          </div>

          <div id="content" className="bg-gray-300/50 p-1 rounded-sm shadow-md flex flex-col flex-1">
            <div id="filtros-e-botoes" className="flex items-center space-x-4 p-2">
              <input
                type="text"
                placeholder="Buscar pelo nome, email ou usuario ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border p-2 rounded text-sm outline-none"
              />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border py-2 px-3 rounded text-sm"
              >
                <option value="">Função</option>
                {uniqueRoles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <button
                onClick={() => navigate("/criar-usuario")}
                className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
              >
                Cadastrar Usuário
              </button>
            </div>

            <div className="flex-1 overflow-auto border rounded bg-white m-2">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-200 border-b border-gray-300">
                    <th className="px-2 py-1 text-left border-t border-gray-300">Nome</th>
                    <th className="px-2 py-1 text-left border-t border-gray-300">Email</th>
                    <th className="px-2 py-1 text-left border-t border-gray-300">Usuário</th>
                    <th className="px-2 py-1 text-left border-t border-gray-300">Função</th>
                    <th className="px-2 py-1 text-center border-t border-gray-300">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((u) => (
                    <tr key={u.db_user_id} className="border-b border-gray-300">
                      <td className="px-2 py-1 text-left">{u.nome}</td>
                      <td className="px-2 py-1 text-left">{u.email}</td>
                      <td className="px-2 py-1 text-left">{u.usuario}</td>
                      <td className="px-2 py-1 text-left">{u.role}</td>
                      <td className="px-2 py-1 text-center flex gap-2 justify-center">
                        <button
                          onClick={() => openModal("edit", u)}
                          className="bg-gray-300 text-gray-600 px-3 py-1 rounded text-xs"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => openModal("delete", u)}
                          className="bg-gray-300 w-6 rounded flex items-center justify-center"
                        >
                          <FaTrash className="text-gray-600" size={10} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

            <div className="flex justify-between mt-4 p-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0}
                className="bg-gray-500 text-white px-4 py-1 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span>Página {page + 1} de {Math.ceil(filteredUsers.length / itemsPerPage)}</span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={(page + 1) * itemsPerPage >= filteredUsers.length}
                className="bg-gray-500 text-white px-4 py-1 rounded disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
