import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // use default import
import './App.css';
import Cadastro from './pages/cadastro';
import Triagem from './pages/triagem';
import Medico from './pages/medico';
import Tv from './pages/tv';
import Login from './pages/login';
import { useState, useEffect } from 'react';
import { carregarPaciente, salvarPaciente } from './utils/storage';
import RotaProtegida from './components/RotaProtegida';


function App() {
  const [pacientes, setPacientes] = useState(carregarPaciente());

  useEffect(() => {
    salvarPaciente(pacientes);
  }, [pacientes]);

  function adicionarPaciente(paciente) {
    setPacientes([...pacientes, paciente]);
  }

  function atualizarPaciente(id, novosDados) {
    setPacientes(pacientes.map(p => p.id === id ? { ...p, ...novosDados } : p));
  }

  function removerPaciente(id) {
    setPacientes(pacientes.filter(p => p.id !== id));
  }

  return (
    <Router>
      
     
      <Routes>
          
      </Routes>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro onAdicionar={adicionarPaciente} />} />
        
        {/* rotaa medico */}
        <Route path='/triagem' element={<RotaProtegida><Triagem pacientes={pacientes} onAtualizar={atualizarPaciente} /></RotaProtegida>} />
        <Route path='/medico' element={<RotaProtegida><Medico pacientes={pacientes} onRemover={removerPaciente} /></RotaProtegida>} />
        <Route path='/tv' element={<Tv pacientes={pacientes} />} />
      </Routes>
    </Router>
  );
}

export default App;
