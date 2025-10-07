import FormLayout from "../components/FormLayout";

export default function EventForm() {
  return (
    <div>
      <FormLayout
        title={'Cadastro de Eventos'}
        componentsAndNames={[
          { label: "Nome", name: "nome", type: "text", required: true },
          { label: "Descrição", name: "descricao", type: "text", required: true },
          { label: "Data e Hora de Início", name: "data_hora_inicio", type: "datetime-local", required: true },
          { label: "Data e Hora de Término", name: "data_hora_fim", type: "datetime-local", required: true },
        ]}
        linkReturn={"/events"}
        linkStore={'/events'}
        linkGetData={'/events'}
        linkUpdate={'/events'}
        authUser={false}
      />
    </div>
  );
}
