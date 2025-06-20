const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const motivo = document.getElementById('motivo').value;
  const telefone = document.getElementById('telefone').value;
  const comorbidade = document.getElementById('comorbidades').value;
  const cpf = document.getElementById('cpf').value;
  const data = document.getElementById('dataNascimento').value;
  const duracao = document.getElementById('duracao').value;
  const alergias = document.getElementById('alergias').value;

  // Pega a lista atual ou inicia vazia
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

  // Cria o novo paciente com um id simples (timestamp)
  const novoPaciente = {
    id: Date.now().toString(),
    nome,
    motivo,
    telefone,
    comorbidade,
    cpf,
    data,
    duracao,
    alergias
  };

  // Adiciona o novo paciente no array
  pacientes.push(novoPaciente);

  // Salva o array atualizado no localStorage
  localStorage.setItem('pacientes', JSON.stringify(pacientes));

  // Redireciona pra triagem
  window.location.href = 'triagem.html';
});
