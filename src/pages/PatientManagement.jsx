import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import { Icon } from "@iconify/react";

export default function PatientManagement() {
  const [paciente, setPaciente] = useState(null);
  const [atendimentoFinalizado, setAtendimentoFinalizado] = useState(false);
  const [tentouRecarregar, setTentouRecarregar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const emAtendimento = JSON.parse(localStorage.getItem("emAtendimento"));
    setPaciente(emAtendimento);

    if (!emAtendimento && !tentouRecarregar) {
      setTimeout(() => {
        const reload = JSON.parse(localStorage.getItem("emAtendimento"));
        setPaciente(reload);
        setTentouRecarregar(true);
      }, 100);
    }

    if (!emAtendimento && tentouRecarregar) {
      setAtendimentoFinalizado(true);
    }
  }, [tentouRecarregar]);

  function finalizarAtendimento() {
    localStorage.removeItem("emAtendimento");
    setPaciente(null);
    setAtendimentoFinalizado(true);
    setTimeout(() => navigate("/ServicePanel"), 3000); // redireciona após 3s
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen px-4 pb-16 pt-28 bg-gray-50 font-inter">
        <div className="max-w-4xl p-8 mx-auto bg-white shadow-md rounded-2xl">
          {atendimentoFinalizado ? (
            <div className="py-20 text-center">
              <Icon
                icon="mdi:emoticon-happy-outline"
                className="w-20 h-20 mx-auto text-green-500"
              />
              <h2 className="mt-6 text-2xl font-semibold text-gray-700">
                Atendimento finalizado com sucesso
              </h2>
              <p className="mt-2 text-gray-600">
                Mais um paciente atendido com sucesso. Que bom poder fazer a diferença na vida de alguém hoje. 💙
              </p>
            </div>
          ) : paciente ? (
            <>
              <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">
                Detalhes do Paciente em Atendimento
              </h2>
              <div className="grid grid-cols-1 gap-4 text-base text-blue-900 sm:grid-cols-2">
                <div><strong>Nome:</strong> {paciente.nome}</div>
                <div><strong>CPF:</strong> {paciente.cpf}</div>
                <div><strong>Telefone:</strong> {paciente.telefone}</div>
                <div><strong>Data de Nascimento:</strong> {paciente.dataNascimento}</div>
                <div><strong>Motivo:</strong> {paciente.motivo}</div>
                <div><strong>Duração dos sintomas:</strong> {paciente.duracao}</div>
                <div><strong>Comorbidades:</strong> {paciente.comorbidades || "Nenhuma"}</div>
                <div><strong>Alergias:</strong> {paciente.alergias || "Nenhuma"}</div>
                <div><strong>Prioridade:</strong> {paciente.prioridade}</div>
              </div>
              <button
                onClick={finalizarAtendimento}
                className="block w-full py-3 mt-10 text-lg font-semibold text-white transition bg-green-600 hover:bg-green-700 rounded-2xl"
              >
                Finalizar Atendimento
              </button>
            </>
          ) : (
            <div className="py-16 text-center text-gray-500">
              <Icon icon="mdi:account-alert-outline" className="w-16 h-16 mx-auto text-yellow-500" />
              <p className="mt-4 text-lg">Nenhum paciente em atendimento no momento.</p>
              <p className="text-sm text-gray-400">Aguarde o próximo chamado ou verifique a fila.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
