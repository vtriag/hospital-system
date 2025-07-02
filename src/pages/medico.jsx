import NavBar from "../components/NavBar"
function Medico({pacientes, onRemover}){
    const urgente = pacientes.filter(p => p.prioridade === 'urgente')
    const moderado = pacientes.filter(p => p.prioridade === 'moderado')
    const leve = pacientes.filter(p => p.prioridade === 'leve')
    const ordem = [...urgente, ...moderado, ...leve]

    function onAtender(id){
        onRemover(id)
    }

    return(
        <>
        <NavBar></NavBar>
        <h2>médico</h2>
        {ordem.length === 0 ? (
            <p>Sem pacientes na fila</p>
        ): (
            <ul>
                {ordem.map(p => (
                    <li key={p.id}>
                        {p.nome} - {p.prioridade.toUpperCase()}
                        <button onClick={() => onAtender(p.id)}>Atender</button>
                    </li>
                ))}
            </ul>
        )}
        </>
    )
}


export default Medico