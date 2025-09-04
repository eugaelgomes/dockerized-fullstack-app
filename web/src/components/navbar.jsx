import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoPersonCircleSharp } from "react-icons/io5";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Função para fechar o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getNomeExibicao = () => {
    if (!user || !user.name) return "Usuário";
    const partesNome = user.name.split(" ");
    if (partesNome.length === 1) return partesNome[0];
    return `${partesNome[0]} ${partesNome[partesNome.length - 1]}`;
  };

  return (
    <nav className="relative bg-color_dark_blue text-white shadow-md">
      <div className="mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home" className="text-2xl font-bold text-color_yellow">
              Codaweb Notes
            </Link>
          </div>


          <div className="flex items-center space-x-4">
            {/* Menu do Usuário (Desktop) */}
            <div className="hidden md:block relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 hover:text-color_yellow transition-colors duration-300"
              >
                <span>{getNomeExibicao()}</span>
                {/* Ícone de Seta */}
                <IoPersonCircleSharp className={`w-8 h-8 transition-transform duration-300 ${isUserMenuOpen ? 'text-color_yellow' : ''}`} />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-max bg-white rounded-md shadow-lg py-1 z-50 text-gray-800">
                  <div className="px-4 py-2 border-b">
                    <p className="font-bold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">Configurações</Link>
                  <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                    Sair
                  </button>
                </div>
              )}
            </div>

            {/* Botão do Menu (Mobile) */}
            <div className="md:hidden" ref={mobileMenuRef}>
              <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                {/* Ícone Hamburger */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Dropdown (Mobile) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-color_dark_blue/95 absolute w-full z-40">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="border-t border-gray-700 my-2"></div>
            <div className="px-3 py-2">
                <p className="font-bold">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
            </div>
            <Link to="/settings" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Configurações</Link>
            <button onClick={logout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 text-red-500">
                Sair
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
