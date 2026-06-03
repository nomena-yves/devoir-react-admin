import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import { EmployeeList } from "./employees/EmployeeList.tsx";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { EmployeeShow } from "./employees/EmployeeShow";
import { StagiareList } from "./Stagiaires/StagiaireList.tsx";

const dataProvider = jsonServerProvider("http://localhost:3002");

export default function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="employe" list={EmployeeList} create={EmployeeCreate} edit={EmployeeEdit} show={EmployeeShow} />
      <Resource name="stagiaire" list={StagiareList}/>
    </Admin>
  );
}