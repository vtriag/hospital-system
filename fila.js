let fila = JSON.parse(localStorage.getItem("fila")) || [];
let emAtendimento = JSON.parse(localStorage.getItem("emAtendimento")) || null;

const containerFila = document.getElementById("pacientesFila"); // container dos pacientes na fila
const nomePaciente = document.getElementById("nomePaciente"); // span do nome no atendimento
const iconePrioridade = document.getElementById("iconePrioridade"); // bolinha do Iconify no atendimento
const prioridadePaciente = document.getElementById("prioridadePaciente"); // texto da prioridade no atendimento

function atualizarFila() {
  fila = JSON.parse(localStorage.getItem("fila")) || [];
  if (!containerFila) return;

  containerFila.innerHTML = "";
  if (fila.length === 0) {
    containerFila.innerHTML = `<p class="text-gray-600 text-center col-span-full">Nenhum paciente aguardando atendimento.</p>`;
    return;
  }

  const ordem = {
    "🔴Urgente": 1,
    "🟡Moderado": 2,
    "🟢Leve": 3,
  };

  fila
    .sort((a, b) => (ordem[a.prioridade] || 99) - (ordem[b.prioridade] || 99))
    .forEach((p) => {
      const cor = p.prioridade?.includes("Urgente")
        ? "#E53E3E"
        : p.prioridade?.includes("Moderado")
        ? "#D69E2E"
        : p.prioridade?.includes("Leve")
        ? "#38A169"
        : "#A0AEC0";

      const prioridadeTexto =
        p.prioridade?.replace(/[🔴🟡🟢]/g, "") || "Não definida";

      const card = document.createElement("div");
      card.className =
        "bg-transparent rounded-xl border border-blue-400 bg-blue-50 shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-blue-900";

      card.innerHTML = `
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="iconify text-base" data-icon="mdi:circle" style="color: ${cor};"></span>
            <h3 class="text-lg font-semibold">${p.nome}</h3>
          </div>
          <p class="text-sm"><strong>Prioridade:</strong> ${prioridadeTexto}</p>
          <p class="text-sm"><strong>Motivo:</strong> ${p.motivo || "-"}</p>
        </div>
      `;

      containerFila.appendChild(card);
    });
}

function atualizarPacienteEmAtendimento() {
  emAtendimento = JSON.parse(localStorage.getItem("emAtendimento")) || null;

  if (emAtendimento) {
    nomePaciente.innerText = emAtendimento.nome;
    prioridadePaciente.innerText =
      emAtendimento.prioridade?.replace(/[🔴🟡🟢]/g, "") || "Sem prioridade";

    const cor = emAtendimento.prioridade?.includes("Urgente")
      ? "#E53E3E"
      : emAtendimento.prioridade?.includes("Moderado")
      ? "#D69E2E"
      : emAtendimento.prioridade?.includes("Leve")
      ? "#38A169"
      : "#A0AEC0";

    iconePrioridade.style.color = cor;
  } else {
    nomePaciente.innerText = "Nenhum paciente em atendimento";
    prioridadePaciente.innerText = "";
    iconePrioridade.style.color = "#A0AEC0";
  }
}

function init() {
  atualizarFila();
  atualizarPacienteEmAtendimento();
}

// Atualiza tudo a cada 5 segundos
setInterval(() => {
  atualizarFila();
  atualizarPacienteEmAtendimento();
}, 5000);

init();
