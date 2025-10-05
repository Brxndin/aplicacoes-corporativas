import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import api from "../config/api";

export default function EventForm() {
  const [form, setForm] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api
        .get(`/events/${id}`)
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
        .put(`/events/${id}`, form)
        .then((res) => {
          console.log(res)

          alert("Evento atualizado com sucesso!");
        })
        .catch((error) => {
          let dadosRetorno = error.response.data;

          alert(dadosRetorno.message);
        });
    } else {
      api
        .post(`/events`, form)
        .then((res) => {
          console.log(res)

          alert("Evento cadastrado com sucesso!");

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
      <h2>Cadastro de Eventos</h2>
      <FormLayout
        data={form}
        componentsAndNames={[
          { label: "Nome", name: "nome", type: "text", required: true },
          { label: "Descrição", name: "descricao", type: "text", required: true },
          { label: "Data e Hora de Início", name: "data_hora_inicio", type: "datetime", required: true },
          { label: "Data e Hora de Término", name: "data_hora_fim", type: "datetime", required: true },
        ]}
        textSubmit={id ? 'Atualizar' : "Cadastrar"}
        linkReturn={"/events"}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
}
