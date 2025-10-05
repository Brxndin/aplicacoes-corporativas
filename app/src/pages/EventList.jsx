import { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import ListLayout from "../components/ListLayout";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/events")
      .then((res) => {
        setEvents((prevState) => {
          return [...prevState, ...res.data];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    api
      .delete(`/events/${id}`)
      .then((res) => {
        if (res.status == 200) {
          alert("Evento removido com sucesso!");

          setEvents(events.filter((user) => user.id != id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Listagem de Eventos</h2>
      <button
        onClick={() => {
          navigate(`/events/form`);
        }}
      >
        Cadastrar Novo
      </button>
      <ListLayout
        data={events}
        columnsAndNames={[
          { column: "Nome", nameInForm: "nome" },
          { column: "Descrição", nameInForm: "descricao" },
          { column: "Data e Hora de Início", nameInForm: "data_hora_inicio" },
          { column: "Data e Hora de Término", nameInForm: "data_hora_fim" },
        ]}
        emptyMessage={"Não há nenhum evento cadastrado!"}
        linkShow={"/events/form"}
        useActions={true}
        handleDelete={handleDelete}
      />
    </div>
  );
}
