import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function PatientHeader() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 flex flex-wrap items-center justify-between w-full h-20 px-6 bg-blue-600 shadow-xl md:px-8 font-inter">
      <Link to="/" className="flex items-center space-x-3">
        <span className="text-xl font-bold tracking-widest text-white uppercase select-none">
          Patient Area
        </span>
      </Link>

      {/* Botão hambúrguer para mobile */}
      <button
        className="block p-2 text-white rounded md:hidden hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuAberto ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Menu principal */}
      <ul
        className={`
          w-full md:w-auto
          md:flex
          md:items-center
          md:space-x-8
          bg-blue-600
          md:bg-transparent
          absolute md:static
          top-20 left-0
          md:top-auto md:left-auto
          transition-all duration-300
          overflow-hidden
          ${menuAberto ? "max-h-60 py-4" : "max-h-0"}
        `}
      >
        <li className="px-6 py-2 md:p-0">
          <button
            onClick={() => {
              navigate("/PatientRegistration");
              setMenuAberto(false);
            }}
            className="w-full text-sm font-semibold tracking-wider text-left text-white transition duration-200 hover:underline hover:text-blue-200 md:w-auto md:text-center"
          >
            CADASTRO DE PACIENTES
          </button>
        </li>
        <li className="px-6 py-2 md:p-0">
          <button
            onClick={() => {
              navigate("/ServicePanel");
              setMenuAberto(false);
            }}
            className="w-full text-sm font-semibold tracking-wider text-left text-white transition duration-200 hover:underline hover:text-blue-200 md:w-auto md:text-center"
          >
            PAINEL
          </button>
        </li>
        <li className="px-6 py-2 md:p-0">
          <button
            onClick={() => {
              handleLogout();
              setMenuAberto(false);
            }}
            className="w-full px-4 py-2 text-white transition duration-200 bg-red-500 rounded shadow-md hover:bg-red-600 md:w-auto"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
