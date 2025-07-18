import { useEffect, useState } from "react";
import { carregarUsuario, salvarUsuario } from "../data/storage";

import PatientRegistration from "./PatientRegistration";
import PatientScreening from "./PatientScreening";
import ServicePanel from "./ServicePanel";

function Doctor() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = carregarUsuario();
    if (user) setUsuario(user);
  }, []);

  function atualizarUsuario(novosPacientes) {
    const atualizado = { ...usuario, pacientes: novosPacientes };
    setUsuario(atualizado);
    salvarUsuario(atualizado);
  }

  function handleCadastrarPaciente(novoPaciente) {
    const novosPacientes = [...(usuario?.pacientes || []), novoPaciente];
    atualizarUsuario(novosPacientes);
  }

  function handleAtualizarPaciente(id, dadosAtualizados) {
    const novosPacientes = usuario.pacientes.map((p) => (p.id === id ? { ...p, ...dadosAtualizados } : p));
    atualizarUsuario(novosPacientes);
  }

  function handleRemoverPaciente(id) {
    const novosPacientes = usuario.pacientes.filter((p) => p.id !== id);
    atualizarUsuario(novosPacientes);
  }

  if (!usuario) {
    return <p className="p-6 text-center text-gray-600">Carregando usuário...</p>;
  }

  return (
    <>
      {/* <PatientRegistration onCadastrarPaciente={handleCadastrarPaciente} /> */}
      <PatientScreening pacientes={usuario.pacientes} onAtualizar={handleAtualizarPaciente} />
      {/* <ServicePanel pacientes={usuario.pacientes} onRemoverPaciente={handleRemoverPaciente} /> */}
    </>
  );
}

export default Doctor;
