import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../config/api";
import { useAuth } from "../auth/AuthContext";

// aqui eu decidi fazer um form padrão pra não repetir o código tantas vezes
export default function FormLayout({
  title,
  componentsAndNames,
  linkReturn,
  linkGetData,
  linkStore,
  linkUpdate,
  authUser
}) {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { id } = useParams();
  const { authState } = useAuth();

  useEffect(() => {
    if (authUser && !authState.auth) {
      navigate('/forbidden');
    }

    if (id) {
      api
        .get(`${linkGetData}/${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id, linkGetData, authState, navigate, authUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      api
        .put(`${linkUpdate}/${id}`, data)
        .then((res) => {
          console.log(res)

          alert(res.data.message);
        })
        .catch((error) => {
          let dadosRetorno = error.response.data;

          alert(dadosRetorno.message);
        });
    } else {
      api
        .post(linkStore, data)
        .then((res) => {
          console.log(res)

          alert(res.data.message);

          setData({});
        })
        .catch((error) => {
          let dadosRetorno = error.response.data;

          alert(dadosRetorno.message);
        });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //   const style = {
  //     display: "flex",
  //   };

  return (
    <>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {componentsAndNames.map((value) => {
          return (
            <div>
              <label>{value.label}</label>
              {["text", "email", "password", "datetime-local"].includes(value.type) && (
                <input
                  type={value.type}
                  name={value.name}
                  value={data[value.name] || ""}
                  onChange={handleChange}
                  required={value.required || false}
                />
              )}
              {value.type == "select" && (
                <select
                  name={value.name}
                  value={data[value.name] || ""}
                  onChange={handleChange}
                  required={value.required || false}
                >
                  <option value={null}>Selecione</option>
                  {value.options.map((option) => {
                    return <option value={option.value}>{option.text}</option>;
                  })}
                </select>
              )}
            </div>
          );
        })}
        <button type="submit">{id ? 'Atualizar' : "Cadastrar"}</button>
        {linkReturn && (
          <button
            onClick={(e) => {
              e.preventDefault();

              navigate(linkReturn);
            }}
          >
            Voltar
          </button>
        )}
      </form>
    </>
  );
}
