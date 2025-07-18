import React from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";

function ServicePanel({ pacientes }) {
  const urgente = pacientes.filter((p) => p.prioridade === "urgente");
  const moderado = pacientes.filter((p) => p.prioridade === "moderado");
  const leve = pacientes.filter((p) => p.prioridade === "leve");

  const ordem = [...urgente, ...moderado, ...leve];

  return (
    <>
      <HeroSection
        title="Painel de Atendimento"
        subtitle="Acompanhe os pacientes em atendimento e os próximos na fila."
        iconName="mdi:television"
      />

      <main className="mx-auto p-8 bg-white shadow-lg font-inter min-h-[70vh]">
        {ordem.length === 0 ? (
          <p className="mt-20 text-lg text-center text-gray-600">
            Nenhum paciente em atendimento.
          </p>
        ) : (
          <div className="flex flex-col gap-12">
            <section className="p-8 text-center border-4 border-blue-600 shadow-lg rounded-3xl bg-blue-50">
              <h2 className="mb-4 text-4xl font-bold text-blue-700">
                Em atendimento
              </h2>
              <p className="text-3xl font-semibold text-blue-900">
                {ordem[0].nome}
              </p>
              <p className="mt-1 text-lg text-blue-700 capitalize">
                Prioridade:{" "}
                <span className="font-medium">{ordem[0].prioridade}</span>
              </p>
            </section>

            <section>
              <h3 className="pb-2 mb-4 text-2xl font-semibold text-blue-700 border-b border-blue-300">
                Próximos na fila
              </h3>
              <ul className="space-y-3 max-h-[300px] overflow-y-auto">
                {ordem.slice(1).map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between p-4 font-medium text-blue-900 bg-blue-100 shadow-inner rounded-xl"
                  >
                    <span>{p.nome}</span>
                    <span className="px-3 py-1 font-semibold text-blue-900 capitalize bg-blue-300 rounded-full">
                      {p.prioridade}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </main>
    </>
  );
}

export default ServicePanel;
