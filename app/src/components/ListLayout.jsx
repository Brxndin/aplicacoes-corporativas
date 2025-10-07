import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

// aqui eu decidi fazer uma lista padrão pra não repetir o código tantas vezes
export default function ListLayout({
  title,
  columnsAndNames,
  emptyMessage,
  useActions,
  linkGetData,
  linkNew,
  linkShow,
  linkDelete,
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get(linkGetData)
      .then((res) => {
        setData((prevState) => {
          return [...prevState, ...res.data];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    api
      .delete(`${linkDelete}/${id}`)
      .then((res) => {
        if (res.status == 200) {
          alert(res.data.message);

          setData(data.filter((item) => item.id != id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // sistema de pesquisa
  const newData = data.filter((item) => {
    let bool = false;

    columnsAndNames.map((value) => {
      bool = bool || (item[value.nameInForm].toLowerCase().includes(search.toLowerCase()));
    })

    return bool;
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

//   const style = {
//     display: "flex",
//   };

  return (
    <>
      <h2>{title}</h2>
      <button
        onClick={() => {
          navigate(linkNew);
        }}
      >
        Cadastrar Novo
      </button>
      <br/>
      <br/>
      <input
        type={'text'}
        name={'pesquisa'}
        value={search}
        onChange={handleChange}
        placeholder="Pesquisar"
      />
      <br/>
      <br/>
      {newData.length > 0 && (
        <table>
          <thead>
            <tr>
              {columnsAndNames.map((value) => (
                <th>{value.column}</th>
              ))}
              {useActions && <th>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {newData.map((item) => (
              <tr
                key={item.id}
                onClick={() => {
                  navigate(`${linkShow}/${item.id}`);
                }}
                // aqui é só pra saber que se clicar tem uma ação
                style={{ cursor: "pointer" }}
              >
                {columnsAndNames.map((value) => (
                  <td>{item[value.nameInForm]}</td>
                ))}

                {useActions && (
                  <td>
                    <button
                      onClick={(e) => {
                        // aqui serve pro onclick da linha ser interrompido
                        e.stopPropagation();

                        handleDelete(item.id);
                      }}
                    >
                      Excluir
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {newData.length <= 0 && <p>{emptyMessage}</p>}
    </>
  );
}
