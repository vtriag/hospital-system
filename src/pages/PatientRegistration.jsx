import React, { useState } from "react";
import HeroSection from "../components/HeroSection";

export default function CadastroPaciente() {
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    telefone: "",
    cpf: "",
    responsavel: "",
    emergencia: "",
    motivo: "",
    duracao: "",
    comorbidades: "",
    alergias: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Pega lista existente do localStorage ou cria vazia
    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    // Cria novo paciente com id único
    const novoPaciente = {
      id: Date.now().toString(),
      ...formData,
    };

    // Adiciona no array
    pacientes.push(novoPaciente);

    // Salva no localStorage
    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    // Mostra mensagem de sucesso
    setIsSubmitted(true);
  }

  return (
    <>
      <HeroSection
        title="Cadastro de Pacientes"
        subtitle={`Preencha os dados do paciente para iniciar o processo de atendimento. Essas informações são essenciais para garantir um cuidado seguro e personalizado.`}
        iconName="mdi:patient"
      />

      <main className="min-h-screen p-6 mx-auto bg-white shadow-md font-inter">
        <section className="w-full max-w-4xl px-6 py-10 mx-auto">
          {!isSubmitted ? (
            <>
              <h2 className="mb-6 text-2xl font-semibold text-blue-600 sm:text-3xl md:text-4xl">
                Dados Pessoais
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 text-sm sm:text-base">
                <div className="relative p-4 border-2 border-blue-400 rounded-2xl">
                  <label
                    htmlFor="nome"
                    className="absolute px-1 text-xs font-medium text-blue-600 bg-white -top-3 left-4 sm:text-sm"
                  >
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full text-blue-600 placeholder-transparent bg-white border-none outline-none"
                  />
                </div>

                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="relative flex-1 p-4 border-2 border-blue-400 rounded-2xl">
                    <label
                      htmlFor="dataNascimento"
                      className="absolute px-1 text-xs font-medium text-blue-600 bg-white -top-3 left-4 sm:text-sm"
                    >
                      Data de nascimento *
                    </label>
                    <input
                      type="date"
                      id="dataNascimento"
                      name="dataNascimento"
                      required
                      value={formData.dataNascimento}
                      onChange={handleChange}
                      className="w-full text-blue-600 placeholder-transparent bg-white border-none outline-none"
                    />
                  </div>

                  <div className="relative flex-1 p-4 border-2 border-blue-400 rounded-2xl">
                    <label
                      htmlFor="telefone"
                      className="absolute px-1 text-xs font-medium text-blue-600 bg-white -top-3 left-4 sm:text-sm"
                    >
                      Telefone de contato *
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      required
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full text-blue-600 placeholder-transparent bg-white border-none outline-none"
                    />
                  </div>
                </div>

                <div className="relative p-4 border-2 border-blue-400 rounded-2xl">
                  <label
                    htmlFor="cpf"
                    className="absolute px-1 text-xs font-medium text-blue-600 bg-white -top-3 left-4 sm:text-sm"
                  >
                    CPF ou Identidade *
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    required
                    value={formData.cpf}
                    onChange={handleChange}
                    className="w-full text-blue-600 placeholder-transparent bg-white border-none outline-none"
                  />
                </div>

                <div className="relative p-4 border-2 border-blue-400 rounded-2xl">
                  <label
                    htmlFor="responsavel"
                    className="absolute px-1 text-xs font-medium text-blue-600 bg-white -top-3 left-4 sm:text-sm"
                  >
                    Responsável (Se menor)
                  </label>
                  <input
                    type="text"
                    id="responsavel"
                    name="responsavel"
                    value={formData.responsavel}
                    onChange={handleChange}
                    className="w-full text-blue-600 placeholder-transparent bg-white border-none outline-none"
                  />
                </div>

                <div className="relative p-4 border-2 border-blue-400 rounded-2xl">
                  <label
                    htmlFor="emergencia"
                    className="absolute px-1 text-xs font-medium text-blue-600 bg-white -top-3 left-4 sm:text-sm"
                  >
                    Telefone de Emergência *
                  </label>
                  <input
                    type="tel"
                    id="emergencia"
                    name="emergencia"
                    required
                    value={formData.emergencia}
                    onChange={handleChange}
                    className="w-full text-blue-600 placeholder-transparent bg-white border-none outline-none"
                  />
                </div>

                <h2 className="mb-6 text-2xl font-semibold text-blue-600 sm:text-3xl md:text-4xl">
                  Informações Clínicas
                </h2>

                <div className="relative p-4 border-2 border-blue-400 rounded-2xl">
                  <label
                    htmlFor="motivo"
                    className="absolute px-1 text-xs font-medium text-blue-600 bg-white -top-3 left-4 sm:text-sm"
                  >
                    Motivo da Visita *
                  </label>
                  <textarea
                    id="motivo"
                    name="motivo"
                    rows="5"
                    required
                    value={formData.motivo}
                    onChange={handleChange}
                    className="w-full text-blue-600 placeholder-transparent bg-white border-none outline-none resize-none"
                  />
                </div>

                <div className="relative p-4 border-2 border-blue-400 rounded-2xl">
                  <label
                    htmlFor="duracao"
                    className="absolute px-1 text-xs font-medium text-blue-600 bg-white -top-3 left-4 sm:text-sm"
                  >
                    Duração dos sintomas
                  </label>
                  <input
                    type="text"
                    id="duracao"
                    name="duracao"
                    placeholder="Ex: “2 dias”, “desde ontem”"
                    value={formData.duracao}
                    onChange={handleChange}
                    className="w-full text-blue-600 bg-white border-none outline-none"
                  />
                </div>

                <div className="relative p-4 border-2 border-blue-400 rounded-2xl">
                  <label
                    htmlFor="comorbidades"
                    className="absolute px-1 text-xs font-medium text-blue-600 bg-white -top-3 left-4 sm:text-sm"
                  >
                    Comorbidades conhecidas *
                  </label>
                  <input
                    type="text"
                    id="comorbidades"
                    name="comorbidades"
                    required
                    placeholder="Ex: diabetes, hipertensão, asma, etc."
                    value={formData.comorbidades}
                    onChange={handleChange}
                    className="w-full text-blue-600 bg-white border-none outline-none"
                  />
                </div>

                <div className="relative p-4 border-2 border-blue-400 rounded-2xl">
                  <label
                    htmlFor="alergias"
                    className="absolute px-1 text-xs font-medium text-blue-600 bg-white -top-3 left-4 sm:text-sm"
                  >
                    Alergias *
                  </label>
                  <input
                    type="text"
                    id="alergias"
                    name="alergias"
                    required
                    placeholder="Ex: alimentares, medicamentosas, etc."
                    value={formData.alergias}
                    onChange={handleChange}
                    className="w-full text-blue-600 bg-white border-none outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-base font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-2xl sm:text-lg hover:bg-blue-700"
                >
                  Cadastrar
                </button>
              </form>
            </>
          ) : (
            <div className="max-w-xl p-8 mx-auto text-center text-blue-700 border border-blue-300 shadow-sm bg-blue-50 bg-opacity-30 rounded-2xl backdrop-blur-sm">
              <h3 className="mb-4 text-2xl font-semibold">Cadastro realizado!</h3>
              <p className="text-base leading-relaxed text-blue-600">
                O paciente foi cadastrado com sucesso. Você pode continuar navegando no sistema ou realizar um novo cadastro.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-8 py-3 mt-6 font-semibold text-white transition duration-300 bg-blue-600 rounded-2xl hover:bg-blue-700"
              >
                Novo cadastro
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
