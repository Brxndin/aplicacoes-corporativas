import { Link } from 'react-router-dom';

export default function Header() {
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
      <Link to="/users" style={linkStyle}>Usuários</Link>
      {/* <Link to="/volunteers" style={linkStyle}>Voluntários</Link>
      <Link to="/events" style={linkStyle}>Eventos</Link>
      <Link to="/dashboard" style={linkStyle}>Dashboard</Link> */}

      {/* esse aqui embaixo ou irão em botões ou serão protegidos por adm */}
      {/* <Link to="/events/form/?:id" style={linkStyle}>Cadastrar Evento</Link>
      <Link to="/volunteers/form/?:id" style={linkStyle}>Cadastrar Voluntário</Link> */}
    </header>
  );
}