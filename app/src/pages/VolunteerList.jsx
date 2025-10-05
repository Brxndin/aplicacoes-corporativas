import { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import ListLayout from "../components/ListLayout";

export default function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/volunteers")
      .then((res) => {
        setVolunteers((prevState) => {
          return [...prevState, ...res.data];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    api
      .delete(`/volunteers/${id}`)
      .then((res) => {
        if (res.status == 200) {
          alert("Voluntário removido com sucesso!");

          setVolunteers(volunteers.filter((user) => user.id != id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Listagem de Voluntários</h2>
      <button
        onClick={() => {
          navigate(`/volunteers/form`);
        }}
      >
        Cadastrar Novo
      </button>
      <ListLayout
        data={volunteers}
        columnsAndNames={[
          { column: "CPF", nameInForm: "cpf" },
          { column: "Nome", nameInForm: "nome" },
          { column: "E-mail", nameInForm: "email" },
          { column: "Telefone", nameInForm: "telefone" },
        ]}
        emptyMessage={"Não há nenhum voluntário cadastrado!"}
        linkShow={"/volunteers/form"}
        useActions={true}
        handleDelete={handleDelete}
      />
    </div>
  );
}
