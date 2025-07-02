import NavBar from "../components/NavBar"

function Triagem( {pacientes, onAtualizar }){
    const semPrioridade = pacientes.filter(p => !p.prioridade)


    function definirPrioridade(id, prioridade){
        onAtualizar(id, {prioridade})
    }
    return(
        <>
        <NavBar></NavBar>
        <h2>Triagem</h2>
        {semPrioridade.length === 0? (
            <p>Todos os pacientes foram triados</p>
        ): (
            semPrioridade.map( p => (
                <div key={p.id}>
                    <strong>{p.nome}</strong> - {p.motivo}
                    <div>
                        <button onClick={() => definirPrioridade(p.id, 'urgente')}>Urgente</button>
                        <button onClick={() => definirPrioridade(p.id, 'moderado')}>Moderado</button>
                        <button onClick={() => definirPrioridade(p.id, 'leve')}>leve</button>
                    </div>
                </div>
            ))
        )}
        </>
    )
}

export default Triagem