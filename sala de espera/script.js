const paciente = JSON.parse(localStorage.getItem('emAtendimento'))
const exibirNome = document.getElementById('exibirPaciente')
const prioridadeExibir = document.getElementById('exibirPrioridade')
const nomeExibir = document.getElementById('exibirName')
exibirNome.value = paciente.nome

if (paciente){
    prioridae.innerText = paciente.prioridae;
    nomeExibir.innerText = paciente.nome
}

