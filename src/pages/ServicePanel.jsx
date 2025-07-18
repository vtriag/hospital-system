import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import HeroSection from "../components/HeroSection";

const getPriorityText = (priority) => {
  if (!priority) return "";
  const p = priority.toLowerCase();
  if (p.includes("urgente")) return "Urgente";
  if (p.includes("moderado")) return "Moderado";
  if (p.includes("leve")) return "Leve";
  return priority;
};

const PatientQueueItem = ({ patient, isNextUp = false, onStart }) => (
  <div className="text-gray-900">
    <p className="text-lg font-medium">{patient.nome}</p>
    <div className="mt-2 text-sm font-semibold text-gray-700 capitalize">
      {getPriorityText(patient.prioridade)}
    </div>
    {/* Só mostra botão se isNextUp e médico */}
    {isNextUp && onStart && (
      <button
        onClick={onStart}
        className="flex items-center gap-2 px-6 py-2 mt-6 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
      >
        <Icon icon="mdi:play" className="w-5 h-5" />
        Iniciar Atendimento
      </button>
    )}
  </div>
);

function ServicePanel({ pacientes }) {
  const navigate = useNavigate();

  // Pega tipo do usuário para condicional
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const isMedico = usuario?.tipo === "medico";

  const pacientesFila =
    pacientes || JSON.parse(localStorage.getItem("fila")) || [];
  const pacienteEmAtendimento = JSON.parse(
    localStorage.getItem("emAtendimento")
  );

  const urgente = pacientesFila.filter((p) =>
    p.prioridade.toLowerCase().includes("urgente")
  );
  const moderado = pacientesFila.filter((p) =>
    p.prioridade.toLowerCase().includes("moderado")
  );
  const leve = pacientesFila.filter((p) =>
    p.prioridade.toLowerCase().includes("leve")
  );

  const ordem = [...urgente, ...moderado, ...leve];
  const proximoPaciente = ordem[0];
  const proximosNaFila = ordem.slice(1);

  const iniciarAtendimento = () => {
    if (proximoPaciente && !pacienteEmAtendimento) {
      localStorage.setItem("emAtendimento", JSON.stringify(proximoPaciente));
      const novaFila = pacientesFila.filter((p) => p.id !== proximoPaciente.id);
      localStorage.setItem("fila", JSON.stringify(novaFila));
      navigate("/PatientManagement");
    }
  };

  return (
    <>
      <HeroSection
        title="Painel de Atendimento"
        subtitle="Acompanhe os pacientes em atendimento e os próximos na fila."
        iconName="mdi:television-classic"
      />

      <main className="min-h-screen p-4 pt-24 bg-gray-50 font-inter sm:p-8">
        <section className="flex flex-col max-w-5xl gap-10 mx-auto">
          {ordem.length === 0 && !pacienteEmAtendimento ? (
            <div className="mt-20 text-center text-gray-500">
              <Icon
                icon="mdi:account-heart-outline"
                className="w-12 h-12 mx-auto text-gray-400"
              />
              <p className="mt-4 text-lg">Nenhum paciente na fila.</p>
              <p className="text-sm">
                A fila de atendimento está vazia no momento.
              </p>
            </div>
          ) : (
            <>
              <section>
                <header className="flex items-center gap-3 mb-4 text-xl font-bold text-gray-800">
                  <Icon
                    icon="mdi:account-star-outline"
                    className="text-blue-600"
                    width={26}
                  />
                  <span>
                    {pacienteEmAtendimento
                      ? "Em Atendimento"
                      : "Próximo Paciente"}
                  </span>
                </header>
                <div>
                  {pacienteEmAtendimento ? (
                    <PatientQueueItem patient={pacienteEmAtendimento} />
                  ) : proximoPaciente ? (
                    <PatientQueueItem
                      patient={proximoPaciente}
                      isNextUp={isMedico} // Só habilita botão se médico
                      onStart={isMedico ? iniciarAtendimento : null}
                    />
                  ) : null}
                </div>
              </section>

              {proximosNaFila.length > 0 && (
                <section>
                  <header className="flex items-center gap-3 mb-4 text-xl font-bold text-gray-800">
                    <Icon
                      icon="mdi:format-list-numbered"
                      className="text-blue-600"
                      width={26}
                    />
                    <span>Fila de Espera</span>
                  </header>
                  <ul className="divide-y divide-gray-200 max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {proximosNaFila.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-center justify-between px-5 py-3 text-gray-800 transition-colors hover:bg-gray-50"
                      >
                        <span>{p.nome}</span>
                        <span className="text-sm font-semibold text-gray-700 capitalize">
                          {getPriorityText(p.prioridade)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default ServicePanel;
