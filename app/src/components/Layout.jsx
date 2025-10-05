import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <>
      <Header/> 
      
      <main style={{ padding: '20px' }}>
        <Outlet /> 
      </main>

      <footer style={{ padding: '10px', backgroundColor: '#eee', textAlign: 'center' }}>
        <p>&copy; 2025 Pindorama</p>
      </footer>
    </>
  );
}