import { useState } from 'react';
import NavBar from '../components/NavBar';

function Triagem({ pacientes, onAtualizar }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const semPrioridade = pacientes.filter(p => !p.prioridade);

  function definirPrioridade(id, prioridade) {
    onAtualizar(id, { prioridade });
  }

  function abrirModal(paciente) {
    setPacienteSelecionado(paciente);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setPacienteSelecionado(null);
  }

  return (
    <>
      <NavBar></NavBar>
      <h2>Triagem</h2>

      {semPrioridade.length === 0 ? (
        <p>Todos os pacientes foram triados</p>
      ) : (
        semPrioridade.map(p => (
          <div key={p.id} style={{ border: '1px solid #4aa3df', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', background: '#e0f0ff' }}>
            <strong>{p.nome}</strong> - {p.motivo}
            <div style={{ marginTop: '0.5rem' }}>
              <button onClick={() => definirPrioridade(p.id, 'urgente')}>Urgente</button>
              <button onClick={() => definirPrioridade(p.id, 'moderado')} style={{ marginLeft: '0.5rem' }}>Moderado</button>
              <button onClick={() => definirPrioridade(p.id, 'leve')} style={{ marginLeft: '0.5rem' }}>Leve</button>
              <button onClick={() => abrirModal(p)} style={{ marginLeft: '1rem' }}>👁️ Ver ficha completa</button>
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      {modalAberto && pacienteSelecionado && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '400px',
            color: 'black',
            boxShadow: '0 0 10px rgba(0,0,0,0.25)',
            position: 'relative',
          }}>
            <h3>Ficha do Paciente</h3>
            <p><strong>Nome:</strong> {pacienteSelecionado.nome}</p>
            <p><strong>Motivo:</strong> {pacienteSelecionado.motivo}</p>
            <p><strong>Telefone:</strong> {pacienteSelecionado.telefone || '-'}</p>
            <p><strong>CPF:</strong> {pacienteSelecionado.cpf || '-'}</p>
            <p><strong>Data de Nascimento:</strong> {pacienteSelecionado.data || '-'}</p>
            <p><strong>Duração dos sintomas:</strong> {pacienteSelecionado.duracao || '-'}</p>
            <p><strong>Comorbidades:</strong> {pacienteSelecionado.comorbidade || '-'}</p>
            <p><strong>Alergias:</strong> {pacienteSelecionado.alergias || '-'}</p>

            <button
              onClick={fecharModal}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#4aa3df',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                float: 'right',
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Triagem;
