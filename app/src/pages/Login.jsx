import { useEffect, useState } from "react";
import FormLayout from "../components/FormLayout";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('auth') == 'true';

    // se o usuário está autenticado, redireciona ele pra página principal
    if (isAuth) {
        // navigate('/dashboard');
        navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    api
        .post('/auth/login', form)
        .then((res) => {
            let dadosRetorno = res.data;

            // verificar se aqui da pra fazer o salvamento do token no localStorage
            alert(dadosRetorno.message);

            localStorage.setItem('token', dadosRetorno.token);
            localStorage.setItem('user', JSON.stringify(dadosRetorno.user));
            localStorage.setItem('auth', dadosRetorno.auth);

            navigate('/home');
        })
        .catch((error) => {
            let dadosRetorno = error.response.data;

            alert(dadosRetorno.message);
        });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Login</h2>
      <FormLayout
        data={form}
        componentsAndNames={[
          { label: "E-mail", name: "email", type: "email", required: true },
          { label: "Senha", name: "senha", type: "password", required: true },
        ]}
        textSubmit={'Entrar'}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
}
