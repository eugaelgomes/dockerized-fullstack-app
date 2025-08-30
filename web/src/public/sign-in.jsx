import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import RecuperarSenha from "../components/recuperar-senha";
import ResetSenha from "../components/redefinir-senha";
import { useAuth } from "../security/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isResetModalVisible, setResetModalVisible] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { login, authenticated } = useAuth();

  // Se já estiver autenticado, redireciona
  useEffect(() => {
    if (authenticated) {
      navigate("/home", { replace: true });
    }
  }, [authenticated, navigate]);

  // Captura token de redefinição na URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("reset_token");
    if (token) {
      setResetToken(token);
      setResetModalVisible(true);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const u = username.trim();
    const p = password;

    if (!u || !p) {
      setErro("Usuário e senha são obrigatórios");
      return;
    }

    try {
      setSubmitting(true);
      const result = await login({ username: u, password: p });

      if (result?.success) {
        setStatus(result.message || "Login realizado com sucesso!");
        // pequeno delay só pra UX (mostra feedback rapidamente)
        setTimeout(() => {
          setStatus("");
          navigate("/home");
        }, 400);
      } else {
        setErro(result?.message || "Falha no login");
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setSubmitting(false);
      setTimeout(() => setErro(""), 3000);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-color_dark_blue text-white px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-lg shadow-black text-black">
          <div className="flex justify-center my-4 rounded-md bg-color_yellow">
            <a
              href="/"
              className="text-color_dark_blue hover:text-color_gray font-bold text-3xl py-2"
            >
              <strong>CodaWeb Notes</strong>
            </a>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block py-1">Usuário:</label>
              <input
                type="text"
                placeholder="Digite seu nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full p-2 rounded-md border focus:outline-none focus:ring-2"
                disabled={submitting}
              />
            </div>
            <div className="relative">
              <label className="block py-1">Senha:</label>
              <div className="flex items-center relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 pr-10"
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
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setModalVisible(true)}
                type="button"
                className="text-color_dark_blue font-bold text-sm"
                disabled={submitting}
              >
                Esqueceu a senha?
              </button>
              <button
                type="submit"
                className="bg-yellow-500 text-white py-2 px-6 rounded-md font-bold shadow-md hover:bg-color_gray transition-all duration-300 disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "Entrando..." : "Entrar"}
              </button>
            </div>

            <hr className="bg-color_dark_blue/20 h-1 rounded-md"></hr>

            <div className="flex items-center justify-center">
              <span className="mr-2">Não tem uma conta?</span>
              <a
                href="/sign-up"
                className="text-color_yellow hover:text-color_gray font-bold text-sm"
              >
                Criar conta
              </a>
            </div>
            {erro && (
              <p className="bg-red-600 text-white py-1 rounded-md text-center text-sm">
                {erro}
              </p>
            )}
            {status && (
              <p className="bg-green-600 text-white py-1 rounded-md text-center text-sm">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Modal de recuperação de senha */}
      <RecuperarSenha
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />

      {/* Modal de redefinição de senha com token */}
      <ResetSenha
        isVisible={isResetModalVisible}
        token={resetToken}
        onClose={() => {
          setResetModalVisible(false);
          // Remove o parâmetro da URL sem recarregar a página
          navigate("/", { replace: true });
        }}
      />
    </>
  );
}
