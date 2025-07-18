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

      <main className="min-h-screen p-4 pt-24 bg-gray-50 font-inter sm:p-6 sm:pt-24">
        {/* pt-24 = espaço para header fixo */}
        <section className="max-w-4xl px-4 py-8 mx-auto sm:px-6 sm:py-10">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {pacientes.map((p) => (
              <div
                key={p.id}
                className="p-6 border-2 border-blue-400 shadow-lg rounded-2xl bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
              >
                <h3 className="mb-2 text-xl font-semibold text-blue-800">
                  {p.nome}
                </h3>
                <p className="mb-4 text-sm text-gray-700">
                  <strong>Motivo:</strong> {p.motivo || "-"}
                </p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <button
                    onClick={() => definirPrioridade(p.id, "🔴Urgente")}
                    className="px-4 py-2 text-sm font-semibold text-red-600 transition-all duration-200 border border-red-200 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    aria-label={`Definir prioridade como Urgente para ${p.nome}`}
                  >
                    🔴 Urgente
                  </button>
                  <button
                    onClick={() => definirPrioridade(p.id, "🟡Moderado")}
                    className="px-4 py-2 text-sm font-semibold text-yellow-600 transition-all duration-200 border border-yellow-200 rounded-full hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                    aria-label={`Definir prioridade como Moderado para ${p.nome}`}
                  >
                    🟡 Moderado
                  </button>
                  <button
                    onClick={() => definirPrioridade(p.id, "🟢Leve")}
                    className="px-4 py-2 text-sm font-semibold text-green-600 transition-all duration-200 border border-green-200 rounded-full hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    aria-label={`Definir prioridade como Leve para ${p.nome}`}
                  >
                    🟢 Leve
                  </button>
                </div>

                <button
                  onClick={() => abrirModal(p)}
                  className="w-full px-6 py-2 mt-2 text-sm font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg shadow-md sm:w-auto hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-label={`Ver ficha completa de ${p.nome}`}
                >
                  Ver ficha completa
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {pacienteSelecionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="w-full max-w-md p-6 transition-transform duration-300 ease-out transform scale-100 bg-white shadow-2xl rounded-xl ring-1 ring-blue-300 sm:p-8">
            <h2 className="pb-3 mb-6 text-2xl font-bold text-blue-700 border-b border-blue-200 sm:text-3xl">
              Ficha do Paciente
            </h2>

            <div className="space-y-3 text-sm text-blue-900 sm:text-base">
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
              className="block w-full px-6 py-3 mt-8 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
