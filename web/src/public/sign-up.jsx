import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../security/AuthContext";

export default function SignUp() {
  const { createUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [erro, setErro] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setStatus("");

    // Validações básicas
    if (!formData.name.trim()) return setErro("Nome é obrigatório");
    if (!formData.username.trim())
      return setErro("Nome de usuário é obrigatório");
    if (!formData.email.trim()) return setErro("E-mail é obrigatório");
    if (!formData.password) return setErro("Senha é obrigatória");

    try {
      setSubmitting(true);
      const response = await createUser(formData);

      if (response.success) {
        setStatus(response.message || "Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setErro(response.message || "Falha ao realizar cadastro");
        setTimeout(() => setErro(""), 3000);
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setErro("Erro ao conectar com o servidor.");
      setTimeout(() => setErro(""), 3000);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-color_dark_blue">
      <div className="w-full max-w-sm bg-white p-8 rounded-sm shadow-lg shadow-black text-black">
        <a
          href="/"
          className="text-color_dark_blue hover:text-color_gray font-bold text-2xl"
        >
          <strong>CodaWeb Notes</strong>
        </a>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block py-1">Nome completo:</label>
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome completo"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block py-1">Nome de usuário:</label>
            <input
              type="text"
              name="username"
              placeholder="Escolha um nome de usuário"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block py-1">E-mail:</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={submitting}
            />
          </div>

          <div className="relative">
            <label className="block py-1">Senha:</label>
            <div className="flex items-center relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                disabled={submitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 flex items-center justify-center h-full"
                tabIndex={-1}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-4 mt-6">
            <button
              type="submit"
              className="bg-color_yellow text-white py-2 px-6 rounded-sm font-bold shadow-md hover:bg-blue-800 disabled:opacity-60 w-full"
              disabled={submitting}
            >
              {submitting ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>

          <hr className="bg-color_dark_blue/20 h-1"></hr>

          <div className="flex items-center justify-center">
            <span className="mr-2">Já possui uma conta?</span>
            <a
              href="/sign-in"
              className="text-color_yellow hover:text-color_gray font-bold text-sm"
            >
              Entrar
            </a>
          </div>

          {erro && (
            <p className="bg-red-600 text-white py-1 rounded-sm text-center text-sm mt-4">
              {erro}
            </p>
          )}
          {status && (
            <p className="bg-green-600 text-white py-1 rounded-sm text-center text-sm mt-4">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
