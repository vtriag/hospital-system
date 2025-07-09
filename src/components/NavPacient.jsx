import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NavPacient(){
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  }
    return(
            <nav>
      <Link to="/">anamenese</Link> | 

      
       <button onClick={handleLogout}>Logout</button>
    </nav>
    )
}

export default NavPacient