import { useParams } from "react-router-dom";
import FormLayout from "../components/FormLayout";

export default function VolunteerForm() {
  const { id } = useParams();

  return (
    <div>
      <FormLayout
        title={'Cadastro de Voluntários'}
        componentsAndNames={[
          { label: "CPF", name: "cpf", type: "text", placeholder: 'Informe o CPF', required: true },
          { label: "Nome", name: "nome", type: "text", placeholder: 'Informe o nome', required: true },
          { label: "E-mail", name: "email", type: "email", placeholder: 'Informe o e-mail', required: true },
          { label: "Telefone", name: "telefone", type: "text", placeholder: 'Informe o telefone', required: true },
        ]}
        submitButtonText={id ? 'Atualizar' : 'Cadastrar'}
        linkReturn={"/volunteers"}
        linkStore={'/volunteers'}
        linkGetData={'/volunteers'}
        linkUpdate={'/volunteers'}
        authPermission={true}
        adminCreatePermission={false}
        adminUpdatePermission={false}
      />
    </div>
  );
}
