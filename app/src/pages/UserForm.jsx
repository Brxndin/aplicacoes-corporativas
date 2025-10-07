import FormLayout from "../components/FormLayout";

export default function UserForm() {
  return (
    <div>
      <FormLayout
        title={'Cadastro de Usuários'}
        componentsAndNames={[
          { label: "Nome", name: "nome", type: "text", required: true },
          { label: "E-mail", name: "email", type: "email", required: true },
          { label: "Tipo", name: "tipo", type: "select", required: true, options: [
            { value: 1, text: "Administrador" },
            { value: 2, text: "Padrão" },
          ] },
          { label: "Senha", name: "senha", type: "password", required: true },
        ]}
        linkReturn={"/users"}
        linkStore={'/users'}
        linkGetData={'/users'}
        linkUpdate={'/users'}
        authUser={true}
      />
    </div>
  );
}
