import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full h-20 px-8 bg-blue-600 shadow-xl bg-gradient-to-r">
      <Link to="/" className="flex items-center space-x-3">
        <img
          src="src/images/logo.svg"
          alt="Logo"
          className="w-auto h-12"
        />
        <span className="text-xl font-bold tracking-widest text-white uppercase select-none">
          MEDICAL SYSTEM
        </span>
      </Link>

      <ul className="flex items-center space-x-8 text-sm font-semibold tracking-wider text-white uppercase">
        <li>
          <Link
            to="/ServiceScreening"
            className="transition duration-200 hover:underline hover:text-blue-200"
          >
            TRIAGEM
          </Link>
        </li>
        <li>
          <Link
            to="/Doctor"
            className="transition duration-200 hover:underline hover:text-blue-200"
          >
            MÉDICO
          </Link>
        </li>
        <li>
          <Link
            to="/ServicePanel"
            className="transition duration-200 hover:underline hover:text-blue-200"
          >
            TV
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white transition duration-200 bg-red-500 rounded shadow-md hover:bg-red-600"
          >
            LOGOUT
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
