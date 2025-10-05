import { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users")
      .then((res) => {
        setUsers((prevState) => {
          return [...prevState, ...res.data];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    // setUsers(users.filter((user) => user.id != id));

    api
        .delete(`/users/${id}`)
        .then((res) => {
            if (res.status == 200) {
                alert('Usuário removido com sucesso!');

                setUsers(users.filter((user) => user.id != id));
            }
        })
        .catch((error) => {
            console.log(error);
        });
  };

  return (
    <div>
      <h2>Listagem de Usuários</h2>
      <button
        onClick={() => {
          navigate(`/users/form`);
        }}
      >
        Cadastrar Novo
      </button>
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                onClick={() => {
                  navigate(`/users/form/${user.id}`);
                }}
                // aqui é só pra saber que se clicar tem uma ação
                style={{ cursor: "pointer" }}
              >
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.tipo}</td>
                <td>
                  <button
                    onClick={(e) => {
                      // aqui serve pro onclick da linha ser interrompido
                      e.stopPropagation();

                      handleDelete(user.id);
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {users.length <= 0 && <p>Não há nenhum usuário cadastrado!</p>}
    </div>
  );
}
