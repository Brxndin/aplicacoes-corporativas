import { useParams } from "react-router-dom";
import FormLayout from "../components/FormLayout";

export default function EventForm() {
  const { id } = useParams();

  return (
    <div>
      <FormLayout
        title={'Cadastro de Eventos'}
        componentsAndNames={[
          { label: "Nome", name: "nome", type: "text", placeholder: 'Informe o nome', required: true },
          { label: "Descrição", name: "descricao", type: "textarea", placeholder: 'Informe a descrição', required: true },
          { label: "Data e Hora de Início", name: "data_hora_inicio", type: "datetime-local", required: true },
          { label: "Data e Hora de Término", name: "data_hora_fim", type: "datetime-local", required: true },
        ]}
        submitButtonText={id ? 'Atualizar' : 'Cadastrar'}
        linkReturn={"/events"}
        linkStore={'/events'}
        linkGetData={'/events'}
        linkUpdate={'/events'}
        authPermission={true}
        adminCreatePermission={true}
        adminUpdatePermission={false}
      />
    </div>
  );
}
