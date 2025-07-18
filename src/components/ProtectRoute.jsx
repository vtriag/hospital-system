import { Navigate } from "react-router-dom";

function ProtectRoute({ children, permitido }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    return <Navigate to="/" />;
  }

  // Se o tipo não for permitido (ex: "paciente" tentando acessar área médica)
  if (permitido && !permitido.includes(usuario.tipo)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectRoute;
