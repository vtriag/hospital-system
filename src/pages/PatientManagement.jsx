
import React, { useState, useEffect } from "react";
import PatientRegistration from "./PatientRegistration";
import PatientScreening from "./PatientScreening";
import { carregarPaciente, salvarPaciente } from "../data/storage";

export default function PatientManagement() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const lista = carregarPaciente() || [];
    setPacientes(lista);
  }, []);

  function onAtualizar(id, dadosAtualizados) {
    const listaAtualizada = pacientes.map((p) =>
      p.id === id ? { ...p, ...dadosAtualizados } : p
    );
    setPacientes(listaAtualizada);
    salvarPaciente(listaAtualizada);
  }

  function adicionarPaciente(novoPaciente) {
    const listaAtualizada = [...pacientes, novoPaciente];
    setPacientes(listaAtualizada);
    salvarPaciente(listaAtualizada);
  }

  return (
    <>
      <PatientRegistration onAddPaciente={adicionarPaciente} />
      <PatientScreening pacientes={pacientes} onAtualizar={onAtualizar} />
    </>
  );
}
