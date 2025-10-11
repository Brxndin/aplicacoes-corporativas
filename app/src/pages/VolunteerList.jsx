import ListLayout from "../components/ListLayout";

export default function VolunteerList() {
  return (
    <div>
      <ListLayout
        title={'Listagem de Voluntários'}
        columnsAndNames={[
          { column: "CPF", nameInForm: "cpf" },
          { column: "Nome", nameInForm: "nome" },
          { column: "E-mail", nameInForm: "email" },
          { column: "Telefone", nameInForm: "telefone" },
        ]}
        emptyMessage={"Não há nenhum voluntário cadastrado!"}
        linkShow={"/volunteers/form"}
        linkDelete={"/volunteers"}
        linkGetData={"/volunteers"}
        linkNew={"/volunteers/form"}
        useAddNew={true}
        useActions={true}
        useUpdate={true}
        authPermission={true}
        adminPermission={false}
      />
    </div>
  );
}
