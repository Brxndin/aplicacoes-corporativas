import { useNavigate } from "react-router-dom";

// aqui eu decidi fazer um form padrão pra não repetir o código tantas vezes
export default function FormLayout({
  data,
  componentsAndNames,
  textSubmit,
  linkReturn,
  handleSubmit,
  handleChange,
}) {
  const navigate = useNavigate();

  //   const style = {
  //     display: "flex",
  //   };

  return (
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
      <button type="submit">{textSubmit}</button>
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
  );
}
