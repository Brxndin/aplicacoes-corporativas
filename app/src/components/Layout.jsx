import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <>
      <Header/> 
      
      <main style={{ padding: '20px' }}>
        <Outlet /> 
      </main>

      <footer>
        <p>&copy; 2025 Pindorama | Todos os direitos reservados.</p>
        <p>Feito por Brandin</p>
      </footer>
    </>
  );
}