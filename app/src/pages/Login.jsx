import { useEffect, useState } from "react";
import FormLayout from "../components/FormLayout";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const { authState, setAuthState } = useAuth();

  useEffect(() => {
    // se o usuário está autenticado, redireciona ele pra página principal
    if (authState.auth) {
        // navigate('/dashboard');
        navigate('/');
    }
  }, [authState, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    api
        .post('/auth/login', form)
        .then((res) => {
            let dadosRetorno = res.data;

            // verificar se aqui da pra fazer o salvamento do token no localStorage
            alert(dadosRetorno.message);

            setAuthState({
                token: dadosRetorno.token,
                user: dadosRetorno.user,
                auth: dadosRetorno.auth,
            });
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
