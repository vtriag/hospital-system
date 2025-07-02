import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  }
  return (
    <nav>
      <Link to="/">Cadastro</Link> | 
      <Link to="/triagem">Triagem</Link> | 
      <Link to="/medico">Médico</Link> | 
      <Link to="/tv">TV</Link>
       <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default NavBar;
