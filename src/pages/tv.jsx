import NavBar from "../components/NavBar";

function TelaTV({ pacientes }) {
  const urgente = pacientes.filter(p => p.prioridade === 'urgente');
  const moderado = pacientes.filter(p => p.prioridade === 'moderado');
  const leve = pacientes.filter(p => p.prioridade === 'leve');

  const ordem = [...urgente, ...moderado, ...leve];

  return (
    <div>
      <NavBar></NavBar>
      <h2>Tela da TV</h2>
      {ordem.length === 0 ? (
        <p>Nenhum paciente em atendimento.</p>
      ) : (
        <>
          <p><strong>Em atendimento:</strong> {ordem[0].nome}</p> 
          <h3>Próximos:</h3>
          <ul>
            {ordem.slice(1).map(p => (
              <li key={p.id}>
                {p.nome} — {p.prioridade}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default TelaTV;
