import ListLayout from "../components/ListLayout";

export default function EventList() {
  return (
    <div>
      <ListLayout
        title={'Listagem de Usuários'}
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
        useActions={true}
      />
    </div>
  );
}
