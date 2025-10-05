import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import api from "../config/api";

export default function VolunteerForm() {
  const [form, setForm] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api
        .get(`/volunteers/${id}`)
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
        .put(`/volunteers/${id}`, form)
        .then((res) => {
          console.log(res)

          alert("Voluntário atualizado com sucesso!");
        })
        .catch((error) => {
          let dadosRetorno = error.response.data;

          alert(dadosRetorno.message);
        });
    } else {
      api
        .post(`/volunteers`, form)
        .then((res) => {
          console.log(res)

          alert("Voluntário cadastrado com sucesso!");

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
      <h2>Cadastro de Voluntários</h2>
      <FormLayout
        data={form}
        componentsAndNames={[
          { label: "CPF", name: "cpf", type: "text", required: true },
          { label: "Nome", name: "nome", type: "text", required: true },
          { label: "E-mail", name: "email", type: "email", required: true },
          { label: "Telefone", name: "telefone", type: "text", required: true },
        ]}
        textSubmit={id ? 'Atualizar' : "Cadastrar"}
        linkReturn={"/volunteers"}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
}
