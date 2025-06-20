const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
const container = document.querySelector('.pacientesAguardando');

if (pacientes.length === 0) {
  container.innerHTML = `<p class="text-center text-gray-500">Nenhum paciente cadastrado.</p>`;
} else {
  container.innerHTML = pacientes.map(p => `
    <div class="bg-blue-50 bg-opacity-50 rounded-xl border border-blue-400 shadow-sm p-4 flex flex-col gap-4 text-blue-900">
      <div>
        <h3 class="text-lg font-semibold mb-1">${p.nome}</h3>
        <p class="text-sm"><strong>Motivo:</strong> ${p.motivo || '-'}</p>
      </div>

      <div class="flex flex-col gap-2">
        <button onclick="selecionar('${p.id}', '🔴Urgente')" class="flex items-center gap-2 text-blue-700 text-sm px-3 py-1.5 rounded hover:bg-blue-100 transition">
          <span class="iconify text-base" data-icon="mdi:circle" style="color:#E53E3E;"></span> Urgente
        </button>
        <button onclick="selecionar('${p.id}', '🟡Moderado')" class="flex items-center gap-2 text-blue-700 text-sm px-3 py-1.5 rounded hover:bg-blue-100 transition">
          <span class="iconify text-base" data-icon="mdi:circle" style="color:#D69E2E;"></span> Moderado
        </button>
        <button onclick="selecionar('${p.id}', '🟢Leve')" class="flex items-center gap-2 text-blue-700 text-sm px-3 py-1.5 rounded hover:bg-blue-100 transition">
          <span class="iconify text-base" data-icon="mdi:circle" style="color:#38A169;"></span> Leve
        </button>
      </div>

      <div class="mt-4 flex justify-center">
        <button 
          onclick="abrirModal('${p.id}')" 
          class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition flex items-center gap-2">
          <span class="iconify text-lg" data-icon="mdi:eye-outline"></span> Ver ficha completa
        </button>
      </div>
    </div>
  `).join('');
}

function abrirModal(id) {
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  const paciente = pacientes.find(p => p.id === id);
  if (!paciente) return;

  const modal = document.getElementById('modal');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <p><strong>Nome:</strong> ${paciente.nome}</p>
    <p><strong>Motivo:</strong> ${paciente.motivo}</p>
    <p><strong>Telefone:</strong> ${paciente.telefone}</p>
    <p><strong>CPF:</strong> ${paciente.cpf}</p>
    <p><strong>Data de Nascimento:</strong> ${paciente.data}</p>
    <p><strong>Duração dos sintomas:</strong> ${paciente.duracao}</p>
    <p><strong>Comorbidades:</strong> ${paciente.comorbidade}</p>
    <p><strong>Alergias:</strong> ${paciente.alergias}</p>
  `;

  modal.classList.remove('hidden');
}

function fecharModal() {
  document.getElementById('modal').classList.add('hidden');
}

function selecionar(id, prioridade) {
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  const pacienteIndex = pacientes.findIndex(p => p.id === id);
  if (pacienteIndex === -1) return alert('Paciente não encontrado');

  const paciente = pacientes[pacienteIndex];
  paciente.prioridade = prioridade;

  // Remove da triagem
  pacientes.splice(pacienteIndex, 1);
  localStorage.setItem('pacientes', JSON.stringify(pacientes));

  // Adiciona na fila
  let fila = JSON.parse(localStorage.getItem('fila')) || [];
  fila = fila.filter(p => p.id !== id);
  fila.push(paciente);
  localStorage.setItem('fila', JSON.stringify(fila));

  window.location.href = 'fila.html';
}
