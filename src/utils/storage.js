// set paciente no local storage
export function salvarPaciente(pacientes){
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
}

// carrega os pacientes, se tiver dados carrega a lista como objeto senão, vazia
export function carregarPaciente(){
    const dados = localStorage.getItem('pacientes')
    return dados? JSON.parse(dados) : []
}