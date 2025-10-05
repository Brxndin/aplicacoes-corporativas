import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// layout principal
import Layout from './components/Layout';

// páginas
import Home from './pages/Home';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
import UserForm from './pages/UserForm';
import UserList from './pages/UserList';
import EventList from './pages/EventList';
import VolunteerList from './pages/VolunteerList';
import EventForm from './pages/EventForm';
import VolunteerForm from './pages/VolunteerForm';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/", 
    // aqui é o layout padrão
    element: <Layout/>,
    
    // aqui são as páginas que serão usadas dentro do layout padrão
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "login",
        element: <Login/>,
      },
      // {
      //   path: "dashboard",
      //   element: <Dashboard/>,
      // },
      {
        path: "users",
        element: <UserList/>,
      },
      {
        path: "users/form/:id?",
        element: <UserForm/>,
      },
      {
        path: "events",
        element: <EventList/>,
      },
      {
        path: "events/form/:id?",
        element: <EventForm/>,
      },
      {
        path: "volunteers",
        element: <VolunteerList/>,
      },
      {
        path: "volunteers/form/:id?",
        element: <VolunteerForm/>,
      },
      {
        path: "*",
        element: <h1>404: Página Não Encontrada!</h1>,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}