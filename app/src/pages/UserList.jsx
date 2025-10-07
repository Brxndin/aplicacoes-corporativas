import ListLayout from "../components/ListLayout";

export default function UserList() {
  return (
    <div>
      <ListLayout
        title={'Listagem de Usuários'}
        columnsAndNames={[
          { column: "Nome", nameInForm: "nome" },
          { column: "E-mail", nameInForm: "email" },
          { column: "Tipo", nameInForm: "tipo" },
        ]}
        emptyMessage={"Não há nenhum usuário cadastrado!"}
        linkShow={"/users/form"}
        linkDelete={"/users"}
        linkGetData={"/users"}
        linkNew={"/users/form"}
        useActions={true}
      />
    </div>
  );
}
