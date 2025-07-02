import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/">Cadastro</Link> | 
      <Link to="/triagem">Triagem</Link> | 
      <Link to="/medico">Médico</Link> | 
      <Link to="/tv">TV</Link>
    </nav>
  );
}

export default NavBar;
