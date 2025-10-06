import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Header() {
  const { authState } = useAuth();

  const navStyle = {
    display: 'flex',
    gap: '15px',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  return (
    <header style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      
      {authState.auth && (
        <>
          <Link to="/volunteers" style={linkStyle}>Voluntários</Link>
          <Link to="/events" style={linkStyle}>Eventos</Link>
          {/* aqui, além do filtro de login, tem que ter o filtro de admin */}
          <Link to="/users" style={linkStyle}>Usuários</Link>
          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
          <Link to="/logout" style={linkStyle}>Logout</Link>
        </>
      )}

      {!authState.auth && (
        <Link to="/login" style={linkStyle}>Login</Link>
      )}
    </header>
  );
}