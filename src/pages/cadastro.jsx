import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import NavBar from "../components/NavBar";

function Cadastro({ onAdicionar }) {
  const [nome, setNome] = useState('');
  const [motivo, setMotivo] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAdicionar({
      id: uuidv4(),
      nome,
      motivo,
      prioridade: null
    });
    setMotivo('');
    setNome('');
  }

  return (
    <>
      
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
          placeholder="Motivo"
        />
        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}

export default Cadastro;
