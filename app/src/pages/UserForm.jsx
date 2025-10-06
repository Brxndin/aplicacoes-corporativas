import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import api from "../config/api";
import { useAuth } from "../auth/AuthContext";

export default function UserForm() {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.auth) {
      navigate('/forbidden');
    }

    if (id) {
      api
        .get(`/users/${id}`)
        .then((res) => {
          setForm(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id, navigate, authState]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      api
        .put(`/users/${id}`, form)
        .then((res) => {
          console.log(res)

          alert("Usuário atualizado com sucesso!");
        })
        .catch((error) => {
          let dadosRetorno = error.response.data;

          alert(dadosRetorno.message);
        });
    } else {
      api
        .post(`/users`, form)
        .then((res) => {
          console.log(res)

          alert("Usuário cadastrado com sucesso!");

          setForm({});
        })
        .catch((error) => {
          let dadosRetorno = error.response.data;

          alert(dadosRetorno.message);
        });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Cadastro de Usuários</h2>
      <FormLayout
        data={form}
        componentsAndNames={[
          { label: "Nome", name: "nome", type: "text", required: true },
          { label: "E-mail", name: "email", type: "email", required: true },
          { label: "Tipo", name: "tipo", type: "select", required: true, options: [
            { value: 1, text: "Administrador" },
            { value: 2, text: "Padrão" },
          ] },
          { label: "Senha", name: "senha", type: "password", required: true },
        ]}
        textSubmit={id ? 'Atualizar' : "Cadastrar"}
        linkReturn={"/users"}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
}
