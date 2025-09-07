import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import profileimage from "../assets/images/profile-pic.png";
import { ChangePasswordSection } from "../components/change-password-section";

export default function Settings() {
  const { getUserData, updateUser, updateUserPassword } = useAuth();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  // Controla se o formulário inteiro está em modo de edição
  const [editMode, setEditMode] = useState(false);
  // Armazena os dados que estão sendo editados no formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
  });

  // Busca os dados do usuário ao carregar o componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        if (response.success) {
          setUserData(response.data);
          // Inicializa o formData com os dados do usuário para edição
          setFormData({
            name: response.data.name || "",
            email: response.data.email || "",
            username: response.data.username || "",
          });
        } else {
          setError(response.message);
          console.error("Erro ao buscar dados do usuário:", response.message);
        }
      } catch (err) {
        setError(
          "Ocorreu um erro ao carregar os dados. Verifique sua conexão."
        );
        console.error("Erro na requisição:", err);
      }
    };
    fetchUserData();
  }, [getUserData]);

  // Função para salvar todas as alterações feitas no formulário
  const handleSaveChanges = async () => {
    try {
      setError("");
      // Envia o objeto formData completo com todas as alterações
      const result = await updateUser(formData);

      if (result.success) {
        // Atualiza os dados locais com os dados que foram salvos
        setUserData((prev) => ({ ...prev, ...formData }));
        // Sai do modo de edição
        setEditMode(false);
      } else {
        setError(
          result.message || "Erro ao atualizar os dados. Tente novamente."
        );
      }
    } catch (err) {
      setError("Erro ao atualizar os dados. Tente novamente.");
      console.error("Erro na atualização:", err);
    }
  };

  // Handler genérico para atualizar o estado do formulário a cada mudança nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para cancelar a edição e reverter as alterações
  const handleCancelEdit = () => {
    // Restaura o formData para os valores originais do userData
    if (userData) {
      setFormData({
        name: userData.name,
        email: userData.email,
        username: userData.username,
      });
    }
    setEditMode(false); // Sai do modo de edição
  };

  const handlwePasswordChange = async (currentPassword, newPassword) => {
    try {
      setError("");
      const result = await updateUserPassword(currentPassword, newPassword);

      if (result.success) {
        alert("Senha atualizada com sucesso!");
      } else {
        setError(
          result.message || "Erro ao atualizar a senha. Tente novamente."
        );
      }
    } catch (err) {
      setError("Erro ao atualizar a senha. Tente novamente.");
      console.error("Erro na atualização da senha:", err);
    }
  }

  // Lógica para upload de foto (permanece a mesma, pois é uma ação isolada)
  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const result = await updateUser({ profilePicture: formData });

      if (result.success) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserData((prev) => ({
            ...prev,
            profilePicture: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setError(
          result.message || "Erro ao atualizar a foto. Tente novamente."
        );
      }
    } catch (err) {
      setError("Erro ao atualizar a foto. Tente novamente.");
      console.error("Erro no upload da foto:", err);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full px-4 py-6">
        {/* Cabeçalho */}
        <div className="mb-6">
          <div className="flex items-center bg-slate-800 rounded-lg shadow-lg p-4 gap-6 border border-slate-700">
            <h1 className="text-xl font-bold text-white mb-2">Configurações</h1>
            <span className="text-slate-400">|</span>
            <p className="text-slate-400">
              Gerencie suas informações pessoais e preferências
            </p>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700">
          <div className="flex items-center gap-4 border-b border-slate-700 p-4">
            <h2 className="text-xl font-semibold text-white">Meu Perfil</h2>
            <span className="text-slate-400">|</span>
            <p className="text-sm text-slate-400 mt-1">
              Informações sobre sua conta no Codaweb
            </p>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-6 bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {userData ? (
              <div className="flex flex-col md:flex-row gap-8">
                {/* Seção da Foto de Perfil */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                    <img
                      src={userData.profilePicture || profileimage}
                      alt="Foto de Perfil"
                      className="w-48 h-48 rounded-full border-4 border-slate-700 object-cover"
                    />
                    <label className="absolute bottom-2 right-2 bg-slate-600 hover:bg-slate-500 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </label>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white">
                      {userData.name}
                    </h3>
                    <p className="text-sm text-slate-400 mb-1">
                      Membro desde:{" "}
                      {new Date(userData.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Seção de Informações como Formulário */}
                <div className="flex-1 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Nome */}
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <p className="text-sm font-medium text-slate-400 mb-2">
                        Nome
                      </p>
                      {editMode ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-slate-600 text-white px-3 py-2 rounded w-full border border-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-white font-medium text-lg">
                          {userData.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <p className="text-sm font-medium text-slate-400 mb-2">
                        Email
                      </p>
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-slate-600 text-white px-3 py-2 rounded w-full border border-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-white font-medium text-lg">
                          {userData.email}
                        </p>
                      )}
                    </div>

                    {/* Usuário */}
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <p className="text-sm font-medium text-slate-400 mb-2">
                        Usuário
                      </p>
                      {editMode ? (
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="bg-slate-600 text-white px-3 py-2 rounded w-full border border-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-white font-medium text-lg">
                          {userData.username}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Botões de Ação Unificados */}
                  <div className="flex justify-end gap-4 pt-4 mt-4 border-t border-slate-700">
                    {editMode ? (
                      <>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-md font-semibold transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSaveChanges}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold transition-colors"
                        >
                          Salvar Alterações
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditMode(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold transition-colors"
                      >
                        Editar Perfil
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-12">
                <div className="animate-pulse flex space-x-4">
                  <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
                  <div className="space-y-3 flex-1">
                    <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-700 rounded"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Seção de Alteração de Senha */}
        <div className="mt-6">
          <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700">
            <div className="flex items-center gap-4 border-b border-slate-700 p-4">
              <h2 className="text-xl font-semibold text-white">Segurança</h2>
              <span className="text-slate-400">|</span>
              <p className="text-sm text-slate-400 mt-1">
                Gerencie suas credenciais de acesso
              </p>
            </div>
            <div className="p-6">
              <ChangePasswordSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
