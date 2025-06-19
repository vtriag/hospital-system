const pacientes = JSON.parse(localStorage.getItem('paciente'))
const dadosPaciente = document.querySelector('.dadosPaciente')
dadosPaciente.innerHTML = `
<h3>Nome</h3>
<P>${pacientes.nome} - <P>
<h3>Motivo:</h3>
<P>${pacientes.motivo} <P>
    <button onclick="selecionar('🔴Urgente')">🔴 Urgente</button>
    <button onclick="selecionar('🟡Moderado')">🟡 Moderado</button>
    <button onclick="selecionar('🟢Leve')">🟢 Leve</button>

    <button onclick='mostrarMais()'>Mostrar Mais</button>
`
let prioridadeSelect = null 

function selecionar(prioridade){
    prioridadeSelect = prioridade

    pacientes.prioridade = prioridadeSelect;
    const fila = JSON.parse(localStorage.getItem('fila')) || []
    fila.push(pacientes)
    localStorage.setItem("fila", JSON.stringify(fila))
    
    window.location.href = "../atendimento médico/medico.html"
}