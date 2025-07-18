
// Controla os Headers que vão aparecer no Sistema, sendo eles, o de médico, o de paciente,
// ou mesmo o de Login.

import { useLocation } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import PatientHeader from "./PatientHeader";
import NavBar from "./NavBar";

function HeaderController() {
  const location = useLocation();
  const path = location.pathname;

  if (path === "/") return <LoginHeader />;
  if (path.startsWith("/Patient")) return <PatientHeader />;

  // Rota para médico ou painel
  if (
    path.startsWith("/Doctor") ||
    path.startsWith("/Service") ||
    path.startsWith("/Anamnese")
  ) {
    return <NavBar />;
  }

  return null;
}

export default HeaderController;

