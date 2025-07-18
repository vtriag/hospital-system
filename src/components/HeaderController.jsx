import { useLocation } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import PatientHeader from "./PatientHeader";
import NavBar from "./Navbar";

function HeaderController() {
  const location = useLocation();
  const path = location.pathname;

  if (path === "/") return <LoginHeader />;

  if (path === "/ServicePanel" || path.startsWith("/Patient")) {
    return <PatientHeader />;
  }

  // NavBar para triagem, atendimento médico e outras rotas de médico
  if (
    path === "/PatientScreening" ||
    path.startsWith("/Doctor") ||
    path.startsWith("/MedicalService") ||
    (path.startsWith("/Service") && path !== "/ServicePanel")
  ) {
    return <NavBar />;
  }

  return null;
}

export default HeaderController;
