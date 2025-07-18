import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const path = location.pathname;

  const isMedico =
    path.startsWith("/Doctor") ||
    path.startsWith("/PatientScreening") ||
    path.startsWith("/MedicalService") ||
    path.startsWith("/Service");

  const isPaciente = path.startsWith("/ServicePanel");

  if (isPaciente) return null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-blue-600 shadow-xl">
      <div className="flex items-center justify-between px-4 py-3 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="src/images/logo.svg"
            alt="Logo"
            className="w-auto h-8 sm:h-12"
          />
          <span className="text-lg font-bold text-white uppercase select-none sm:text-xl">
            MEDICAL SYSTEM
          </span>
        </Link>

        {/* Botão hamburguer mobile */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="text-white focus:outline-none"
          >
            <Icon
              icon={menuOpen ? "mdi:close" : "mdi:menu"}
              className="w-7 h-7"
            />
          </button>
        </div>

        {/* Menu desktop */}
        <ul className="hidden text-sm font-semibold tracking-wide text-white uppercase sm:flex sm:items-center sm:space-x-6">
          {isMedico && (
            <>
              <li>
                <Link
                  to="/PatientScreening"
                  className="hover:underline hover:text-blue-200"
                >
                  Triagem
                </Link>
              </li>
              <li>
                <Link
                  to="/MedicalService"
                  className="hover:underline hover:text-blue-200"
                >
                  Atendimento
                </Link>
              </li>
            </>
          )}
          <li>
            <button
              onClick={handleLogout}
              className="px-4 py-2 transition bg-red-500 rounded shadow hover:bg-red-600"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <ul className="px-4 pb-4 space-y-3 font-semibold tracking-wide text-white uppercase bg-blue-600 sm:hidden">
          {isMedico && (
            <>
              <li>
                <Link
                  to="/PatientScreening"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 hover:underline hover:text-blue-200"
                >
                  Triagem
                </Link>
              </li>
              <li>
                <Link
                  to="/MedicalService"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 hover:underline hover:text-blue-200"
                >
                  Atendimento
                </Link>
              </li>
            </>
          )}
          <li>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full py-2 transition bg-red-500 rounded shadow hover:bg-red-600"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
