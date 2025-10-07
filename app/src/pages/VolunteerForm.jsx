import FormLayout from "../components/FormLayout";

export default function VolunteerForm() {
  return (
    <div>
      <FormLayout
        title={'Cadastro de Voluntários'}
        componentsAndNames={[
          { label: "CPF", name: "cpf", type: "text", required: true },
          { label: "Nome", name: "nome", type: "text", required: true },
          { label: "E-mail", name: "email", type: "email", required: true },
          { label: "Telefone", name: "telefone", type: "text", required: true },
        ]}
        linkReturn={"/volunteers"}
        linkStore={'/volunteers'}
        linkGetData={'/volunteers'}
        linkUpdate={'/volunteers'}
        authUser={false}
      />
    </div>
  );
}
