import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../config/api";

export default function UserForm() {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      api
        .put(`/users/${id}`, form)
        .then((res) => {
          alert("Usuário atualizado com sucesso!");
        })
        .catch((error) => {
          alert("Erro ao atualizar o usuário!");

          console.log(error);
        });
    } else {
      api
        .post(`/users`, form)
        .then((res) => {
          alert("Usuário cadastrado com sucesso!");

          setForm({});
        })
        .catch((error) => {
          alert("Erro ao cadastrar o usuário!");

          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Cadastro de Usuários</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={form.nome || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tipo:</label>
          <select
            name="tipo"
            value={form.tipo || ""}
            onChange={handleChange}
            required
          >
            <option value={null}>Selecione</option>
            <option value={1}>Administrador</option>
            <option value={2}>Padrão</option>
          </select>
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={form.senha || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
        <button
          onClick={(e) => {
            e.preventDefault();

            navigate("/users");
          }}
        >
          Voltar
        </button>
      </form>
    </div>
  );
}
