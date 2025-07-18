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
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full h-16 px-4 transition-all duration-300 bg-blue-600 shadow-xl sm:h-20 sm:px-8 font-inter">
      <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
        <span className="text-sm font-bold tracking-wide text-white uppercase select-none sm:text-xl sm:tracking-widest">
          Patient
        </span>
      </Link>

      <ul className="flex items-center space-x-3 text-xs font-semibold tracking-wide text-white sm:space-x-8 sm:text-sm sm:tracking-wider">
        <li>
          <button
            onClick={() => navigate("/PatientRegistration")}
            className="transition duration-200 hover:underline hover:text-blue-200"
          >
            CADASTRO
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/ServicePanel")}
            className="transition duration-200 hover:underline hover:text-blue-200"
          >
            PAINEL
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="px-2 py-1 text-xs text-white transition duration-200 bg-red-500 rounded shadow-md sm:px-4 sm:py-2 sm:text-sm hover:bg-red-600"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
