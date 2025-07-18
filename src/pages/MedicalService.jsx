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

const PatientQueueItem = ({ patient, isNextUp = false, onStart, onFinish }) => (
  <div className="text-gray-900">
    <p className="text-lg font-medium">{patient.nome}</p>
    <div className="mt-2 text-sm font-semibold text-gray-700 capitalize">
      {getPriorityText(patient.prioridade)}
    </div>
    {isNextUp && onStart && (
      <button
        onClick={onStart}
        className="flex items-center gap-2 px-6 py-2 mt-6 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
      >
        <Icon icon="mdi:play" className="w-5 h-5" />
        Iniciar Atendimento
      </button>
    )}
    {onFinish && (
      <button
        onClick={onFinish}
        className="flex items-center gap-2 px-6 py-2 mt-6 text-sm font-medium text-white transition-colors bg-red-600 rounded-md shadow-sm hover:bg-red-700"
      >
        <Icon icon="mdi:stop" className="w-5 h-5" />
        Finalizar Atendimento
      </button>
    )}
  </div>
);

function MedicalService() {
  const navigate = useNavigate();

  const pacientesFila = JSON.parse(localStorage.getItem("fila")) || [];
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

  const filaOrdenada = [...urgente, ...moderado, ...leve];
  const proximoPaciente = filaOrdenada[0];
  const proximosNaFila = filaOrdenada.slice(1);

  const iniciarAtendimento = () => {
    if (proximoPaciente && !pacienteEmAtendimento) {
      localStorage.setItem("emAtendimento", JSON.stringify(proximoPaciente));
      const novaFila = pacientesFila.filter((p) => p.id !== proximoPaciente.id);
      localStorage.setItem("fila", JSON.stringify(novaFila));
      navigate("/PatientManagement");
    }
  };

  const finalizarAtendimento = () => {
    localStorage.removeItem("emAtendimento");
    navigate("/PatientManagement");
  };

  return (
    <>
      <HeroSection
        title="Painel Médico - Atendimento"
        subtitle="Gerencie pacientes em atendimento e os próximos na fila."
        iconName="mdi:stethoscope"
      />

      <main className="min-h-screen p-6 pt-24 mx-auto bg-gray-50 font-inter">
        {filaOrdenada.length === 0 && !pacienteEmAtendimento ? (
          <div className="mt-20 text-center text-gray-500">
            <Icon
              icon="mdi:account-heart-outline"
              className="mx-auto text-gray-400 w-14 h-14"
            />
            <p className="mt-4 text-lg">Nenhum paciente na fila.</p>
            <p className="text-sm">
              A fila de atendimento está vazia no momento.
            </p>
          </div>
        ) : (
          <>
            <section className="mb-12">
              <header className="flex items-center gap-3 mb-5 text-xl font-bold text-gray-800">
                <Icon
                  icon="mdi:account-star-outline"
                  className="text-blue-600"
                  width={28}
                />
                <span>
                  {pacienteEmAtendimento
                    ? "Em Atendimento"
                    : "Próximo Paciente"}
                </span>
              </header>
              <div>
                {pacienteEmAtendimento ? (
                  <PatientQueueItem
                    patient={pacienteEmAtendimento}
                    onFinish={finalizarAtendimento}
                  />
                ) : proximoPaciente ? (
                  <PatientQueueItem
                    patient={proximoPaciente}
                    isNextUp={true}
                    onStart={iniciarAtendimento}
                  />
                ) : null}
              </div>
            </section>

            {proximosNaFila.length > 0 && (
              <section>
                <header className="flex items-center gap-3 mb-5 text-xl font-bold text-gray-800">
                  <Icon
                    icon="mdi:format-list-numbered"
                    className="text-blue-600"
                    width={28}
                  />
                  <span>Fila de Espera</span>
                </header>
                <ul className="border border-gray-200 divide-y divide-gray-200 rounded-md scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
      </main>
    </>
  );
}

export default MedicalService;
