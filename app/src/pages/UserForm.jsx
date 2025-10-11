import { useParams } from "react-router-dom";
import FormLayout from "../components/FormLayout";

export default function UserForm() {
  const { id } = useParams();

  return (
    <div>
      <FormLayout
        title={'Cadastro de Usuários'}
        componentsAndNames={[
          { label: "Nome", name: "nome", type: "text", placeholder: 'Informe o nome', required: true },
          { label: "E-mail", name: "email", type: "email", placeholder: 'Informe o e-mail', required: true },
          { label: "Tipo", name: "tipo", type: "select", required: true, options: [
            { value: 1, text: "Administrador" },
            { value: 2, text: "Padrão" },
          ] },
          { label: "Senha", name: "senha", type: "password", placeholder: 'Informe a senha', required: true },
        ]}
        submitButtonText={id ? 'Atualizar' : 'Cadastrar'}
        linkReturn={"/users"}
        linkStore={'/users'}
        linkGetData={'/users'}
        linkUpdate={'/users'}
        authPermission={true}
        adminCreatePermission={true}
        adminUpdatePermission={true}
      />
    </div>
  );
}
