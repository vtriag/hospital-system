let fila = JSON.parse(localStorage.getItem("fila")) || [];
let emAtendimento = JSON.parse(localStorage.getItem("emAtendimento")) || null;

const container = document.getElementById("pacientesFila"); // Onde lista pacientes na fila
const pacienteEmAtendimento = document.getElementById("pacienteEmAtendimento"); // Div que mostra paciente em atendimento
const btnFinalizar = document.getElementById("finalizarAtendimento"); // Botão finalizar atendimento

// Carrega a fila e mostra os pacientes ordenados por prioridade
function carregarFila() {
  fila = JSON.parse(localStorage.getItem("fila")) || [];
  container.innerHTML = "";

  if (fila.length === 0) {
    container.innerHTML = `<p class="text-gray-600 col-span-full text-center">Nenhum paciente aguardando atendimento.</p>`;
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
        "bg-blue-50 bg-opacity-50 rounded-xl border border-blue-400 shadow-sm p-4 flex flex-col gap-4 text-blue-900";

      card.innerHTML = `
        <div>
          <h3 class="text-lg font-semibold mb-1 flex items-center gap-2">
            <span class="iconify text-base" data-icon="mdi:circle" style="color: ${cor}"></span>
            ${p.nome}
          </h3>
          <p class="text-sm"><strong>Prioridade:</strong> ${prioridadeTexto}</p>
          <p class="text-sm"><strong>Motivo:</strong> ${p.motivo || "-"}</p>
        </div>

        <div class="flex justify-center">
          <button 
            onclick="iniciarAtendimento('${p.id}')" 
            class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition flex items-center gap-2">
            Iniciar atendimento
          </button>
        </div>
      `;

      container.appendChild(card);
    });
}

// Começa atendimento: remove paciente da fila e atualiza o que está em atendimento
function iniciarAtendimento(id) {
  fila = JSON.parse(localStorage.getItem("fila")) || [];
  const index = fila.findIndex((p) => p.id === id);

  if (index === -1) {
    alert("Paciente não encontrado na fila.");
    return;
  }

  emAtendimento = fila.splice(index, 1)[0];
  localStorage.setItem("fila", JSON.stringify(fila));
  localStorage.setItem("emAtendimento", JSON.stringify(emAtendimento));

  atualizarPacienteEmAtendimento();
  carregarFila();
}

// Atualiza a exibição do paciente em atendimento (div com bolinha + nome + prioridade)
function atualizarPacienteEmAtendimento() {
  if (emAtendimento) {
    const cor = emAtendimento.prioridade?.includes("Urgente")
      ? "#E53E3E"
      : emAtendimento.prioridade?.includes("Moderado")
      ? "#D69E2E"
      : emAtendimento.prioridade?.includes("Leve")
      ? "#38A169"
      : "#A0AEC0";

    const prioridadeTexto =
      emAtendimento.prioridade?.replace(/[🔴🟡🟢]/g, "") || "Sem prioridade";

    pacienteEmAtendimento.innerHTML = `
      <span class="iconify text-base" data-icon="mdi:circle" style="color: ${cor};"></span>
      ${emAtendimento.nome} - ${prioridadeTexto}
    `;
    btnFinalizar.disabled = false;
    btnFinalizar.classList.remove("hidden");
  } else {
    pacienteEmAtendimento.textContent = "Nenhum paciente em atendimento";
    btnFinalizar.disabled = true;
    btnFinalizar.classList.add("hidden");
  }
}

// Finaliza o atendimento atual
function finalizarAtendimento() {
  if (!emAtendimento) return;

  alert(`Atendimento de ${emAtendimento.nome} finalizado.`);

  emAtendimento = null;
  localStorage.removeItem("emAtendimento");

  atualizarPacienteEmAtendimento();
  carregarFila();
}

btnFinalizar.addEventListener("click", finalizarAtendimento);

// Inicializa a página
function init() {
  carregarFila();
  atualizarPacienteEmAtendimento();
}

// Expor iniciarAtendimento para o botão funcionar
window.iniciarAtendimento = iniciarAtendimento;

init();
