import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";

export default function PatientScreening() {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("pacientes")) || [];
    setPacientes(dados.filter((p) => !p.prioridade));
  }, []);

  const definirPrioridade = (id, prioridade) => {
    // Remove paciente da triagem
    const atualizados = pacientes.filter((p) => p.id !== id);
    setPacientes(atualizados);
    localStorage.setItem("pacientes", JSON.stringify(atualizados));

    // Adiciona paciente na fila com prioridade
    const pacientesTodos = JSON.parse(localStorage.getItem("pacientes")) || [];
    const paciente =
      pacientesTodos.find((p) => p.id === id) ||
      pacientes.find((p) => p.id === id);

    if (paciente) {
      const pacienteAtualizado = { ...paciente, prioridade };
      let fila = JSON.parse(localStorage.getItem("fila")) || [];
      fila.push(pacienteAtualizado);
      localStorage.setItem("fila", JSON.stringify(fila));
    }
  };

  const abrirModal = (paciente) => setPacienteSelecionado(paciente);
  const fecharModal = () => setPacienteSelecionado(null);

  if (pacientes.length === 0) {
    return (
      <>
        <HeroSection
          title="Pacientes para Triagem"
          subtitle="Aqui você verá os pacientes que precisam ser triados e classificados por prioridade."
          iconName="mdi:clipboard-text"
        />

        <main className="min-h-screen p-6 pt-24 bg-white font-inter">
          {/* pt-24 = padding-top para evitar ficar embaixo do header fixo */}
          <section className="max-w-4xl px-6 py-10 mx-auto">
            <p className="mt-6 text-lg text-center text-gray-500">
              Nenhum paciente para triagem.
            </p>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <HeroSection
        title="Pacientes para Triagem"
        subtitle="Aqui você verá os pacientes que precisam ser triados e classificados por prioridade."
        iconName="mdi:clipboard-text"
      />

      <main className="min-h-screen p-6 pt-24 bg-white font-inter">
        {/* pt-24 = espaço para header fixo */}
        <section className="max-w-4xl px-6 py-10 mx-auto">
          <div className="flex flex-col gap-6">
            {pacientes.map((p) => (
              <div
                key={p.id}
                className="p-6 border-2 border-blue-400 shadow rounded-2xl bg-blue-50"
              >
                <h3 className="mb-2 text-lg font-semibold text-blue-900">
                  {p.nome}
                </h3>
                <p className="mb-4 text-sm text-blue-900">
                  <strong>Motivo:</strong> {p.motivo || "-"}
                </p>

                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => definirPrioridade(p.id, "🔴Urgente")}
                    className="px-4 py-2 text-sm font-semibold text-red-600 transition rounded-2xl hover:bg-red-100"
                  >
                    🔴 Urgente
                  </button>
                  <button
                    onClick={() => definirPrioridade(p.id, "🟡Moderado")}
                    className="px-4 py-2 text-sm font-semibold text-yellow-600 transition rounded-2xl hover:bg-yellow-100"
                  >
                    🟡 Moderado
                  </button>
                  <button
                    onClick={() => definirPrioridade(p.id, "🟢Leve")}
                    className="px-4 py-2 text-sm font-semibold text-green-600 transition rounded-2xl hover:bg-green-100"
                  >
                    🟢 Leve
                  </button>
                </div>

                <button
                  onClick={() => abrirModal(p)}
                  className="px-6 py-2 text-sm font-semibold text-white transition bg-blue-600 rounded-2xl hover:bg-blue-700"
                >
                  Ver ficha completa
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {pacienteSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="w-full max-w-md p-8 mx-4 bg-white shadow-2xl rounded-3xl ring-1 ring-blue-300">
            <h2 className="pb-2 mb-6 text-2xl font-bold text-blue-700 border-b border-blue-200">
              Ficha do Paciente
            </h2>

            <div className="space-y-4 text-sm text-blue-900 sm:text-base">
              <div>
                <span className="font-semibold">Nome:</span>{" "}
                <span>{pacienteSelecionado.nome || "-"}</span>
              </div>
              <div>
                <span className="font-semibold">Motivo:</span>{" "}
                <span>{pacienteSelecionado.motivo || "-"}</span>
              </div>
              <div>
                <span className="font-semibold">Telefone:</span>{" "}
                <span>{pacienteSelecionado.telefone || "-"}</span>
              </div>
              <div>
                <span className="font-semibold">CPF:</span>{" "}
                <span>{pacienteSelecionado.cpf || "-"}</span>
              </div>
              <div>
                <span className="font-semibold">Data de Nascimento:</span>{" "}
                <span>{pacienteSelecionado.dataNascimento || "-"}</span>
              </div>
              <div>
                <span className="font-semibold">Duração dos sintomas:</span>{" "}
                <span>{pacienteSelecionado.duracao || "-"}</span>
              </div>
              <div>
                <span className="font-semibold">Comorbidades:</span>{" "}
                <span>{pacienteSelecionado.comorbidades || "-"}</span>
              </div>
              <div>
                <span className="font-semibold">Alergias:</span>{" "}
                <span>{pacienteSelecionado.alergias || "-"}</span>
              </div>
            </div>

            <button
              onClick={fecharModal}
              className="block w-full px-6 py-3 mt-8 font-semibold text-white transition bg-blue-600 rounded-2xl hover:bg-blue-700"
              aria-label="Fechar ficha do paciente"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
