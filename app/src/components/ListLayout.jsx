import { useNavigate } from "react-router-dom";

// aqui eu decidi fazer uma lista padrão pra não repetir o código tantas vezes
export default function ListLayout({
  data,
  columnsAndNames,
  emptyMessage,
  linkShow,
  useActions,
  handleDelete,
}) {
  const navigate = useNavigate();

//   const style = {
//     display: "flex",
//   };

  return (
    <>
      {data.length > 0 && (
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
            {data.map((d) => (
              <tr
                key={d.id}
                onClick={() => {
                  navigate(`${linkShow}/${d.id}`);
                }}
                // aqui é só pra saber que se clicar tem uma ação
                style={{ cursor: "pointer" }}
              >
                {columnsAndNames.map((value) => (
                  <td>{d[value.nameInForm]}</td>
                ))}

                {useActions && (
                  <td>
                    <button
                      onClick={(e) => {
                        // aqui serve pro onclick da linha ser interrompido
                        e.stopPropagation();

                        handleDelete(d.id);
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
      {data.length <= 0 && <p>{emptyMessage}</p>}
    </>
  );
}
