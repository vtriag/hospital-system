const form = document.getElementById('form')
form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const motivo = document.getElementById('motivo').value
// telefone, comorbidades, cpf, data de nascimento, duração de sintomas, alergias
    const telefone = document.getElementById('telefone').value ;;
    const comorbidade = document.getElementById('comorbidades').value
    const cpf = document.getElementById('cpf').value ;;
    const data = document.getElementById('dataNascimento').value //
    const duração = document.getElementById('duracao').value
    const alergias = document.getElementById('alergias').value
    localStorage.setItem('paciente', JSON.stringify({nome, motivo, telefone, comorbidade, cpf, data, duração, alergias}))
    window.location.href = "./Triagem/Triagem.html"
})