import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import NavBar from "../components/NavBar";
import NavPacient from "../components/NavPacient";
// paciente
function Cadastro({ onAdicionar }) {
  const [nome, setNome] = useState('');
  const [motivo, setMotivo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [data, setData] = useState('');
  const [duracao, setDuracao] = useState('');
  const [comorbidade, setComorbidade] = useState('');
  const [alergias, setAlergias] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAdicionar({
      id: uuidv4(),
      nome,
      motivo,
      telefone,
      cpf,
      data,
      duracao,
      comorbidade,
      alergias,
      prioridade: null
    });
    setMotivo('');
    setNome('');
    setAlergias('');
    setComorbidade('');
    setCpf('');
    setData('');
    setDuracao('');
    setTelefone('');
  }

  return (
    <>
      <NavPacient/>
      <form onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="motivo"
        />
          <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="telefone"
        />
          <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="cpf"
        />
                  <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="data"
        />
          <input
          type="text"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
          placeholder="duração"
        />
          <input
          type="text"
          value={comorbidade}
          onChange={(e) => setComorbidade(e.target.value)}
          placeholder="comorbidade"
        />
          <input
          type="text"
          value={alergias}
          onChange={(e) => setAlergias(e.target.value)}
          placeholder="alergias"
        />
        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}

export default Cadastro;
