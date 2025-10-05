import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// layout principal
import Layout from './components/Layout';

// páginas
import Home from './pages/Home';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
import UserForm from './pages/UserForm';
import UserList from './pages/UserList';

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
      // {
      //   path: "login",
      //   element: <Login/>,
      // },
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
      // {
      //   path: "events",
      //   element: <UserList/>,
      // },
      // {
      //   path: "events/form",
      //   element: <UserForm/>,
      // },
      // {
      //   path: "volunteers",
      //   element: <UserList/>,
      // },
      // {
      //   path: "volunteers/form",
      //   element: <UserForm/>,
      // },
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