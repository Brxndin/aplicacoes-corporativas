import { useAuth } from "../auth/AuthContext";
import ListLayout from "../components/ListLayout";

export default function EventList() {
  const { authState } = useAuth();

  return (
    <div>
      <ListLayout
        title={'Listagem de Eventos'}
        columnsAndNames={[
          { column: "Nome", nameInForm: "nome" },
          { column: "Descrição", nameInForm: "descricao" },
          { column: "Data e Hora de Início", nameInForm: "data_hora_inicio" },
          { column: "Data e Hora de Término", nameInForm: "data_hora_fim" },
        ]}
        emptyMessage={"Não há nenhum evento cadastrado!"}
        linkShow={"/events/form"}
        linkDelete={"/events"}
        linkGetData={"/events"}
        linkNew={"/events/form"}
        // aqui define que somente administradores podem cadastrar
        useAddNew={authState?.user?.role == 1}
        useActions={true}
        useUpdate={true}
        authPermission={true}
        adminPermission={false}
      />
    </div>
  );
}
