import { Navigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario || usuario.tipo !== "medico") {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectRoute;
