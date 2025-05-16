import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.scss';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h1 className="navbar__brand">Todo App</h1>
      <ul className="navbar__links">
        {user ? (
          <>
            <li><Link to="/">Todos</Link></li>
            <li><Link to="/add">Add Todo</Link></li>
            <li><button onClick={logoutUser}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;