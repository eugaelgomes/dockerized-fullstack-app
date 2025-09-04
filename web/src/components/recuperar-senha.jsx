import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function RecuperarSenha({ isVisible, onClose }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [status, setStatus] = useState("");

  // Usa a função do contexto
  const { recoveryPassword } = useAuth();

  if (!isVisible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Chama a função do contexto
    const result = await recoveryPassword(email);
    setMessage(result.message);

    if (!result.success) {
      // Define a mensagem de erro
      setErro(result.message);
      // Configura o timer para limpar a mensagem após 3 segundos
      setTimeout(() => setErro(""), 3000);
    } else {
      // Define a mensagem de sucesso
      setStatus(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-sm shadow-lg w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Recuperar Acesso</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {message && (
            <p className="text-sm text-center text-gray-700">{message}</p>
          )}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </button>
          </div>

          {erro && <p className="bg-red-600 text-white py-1 rounded-sm text-center text-sm">{erro}</p>}
          {status && <p className="bg-green-600 text-white py-1 rounded-sm text-center text-sm">{status}</p>}
        </form>
      </div>
    </div>
  );
}

export default RecuperarSenha;
