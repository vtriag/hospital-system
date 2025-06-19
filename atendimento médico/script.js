function renderFila() {
  const lista = document.querySelector('.container'); // Corrigido: container é uma class
  lista.innerHTML = '';

  const fila = JSON.parse(localStorage.getItem('fila')) || [];

  const urgente = fila.filter(p => p.prioridade === "🔴Urgente");
  const moderado = fila.filter(p => p.prioridade === "🟡Moderado");
  const leve = fila.filter(p => p.prioridade === "🟢Leve");

  const filaOrdenada = [...urgente, ...moderado, ...leve];

  filaOrdenada.forEach((p) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <h3 class="nome-paciente">${p.nome}</h3>
      <p>${p.prioridade}</p>
      <button onclick="iniciarAtendimento('${p.nome}', '${p.motivo}', '${p.prioridade}')">
        Iniciar atendimento
      </button>
    `;
    lista.appendChild(div);
  });
}

function iniciarAtendimento(nome, motivo, prioridade) {
  let fila = JSON.parse(localStorage.getItem('fila')) || [];

  const index = fila.findIndex(p =>
    p.nome === nome &&
    p.motivo === motivo &&
    p.prioridade === prioridade
  );

  if (index !== -1) {
    const paciente = fila.splice(index, 1)[0];
    localStorage.setItem('fila', JSON.stringify(fila));
    localStorage.setItem('emAtendimento', JSON.stringify(paciente));
    renderFila(); // atualiza a lista
    window.location.href = '../sala de espera/fila.html'; // redireciona para TV
  }
}

// inicia ao carregar a página
renderFila();
