import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  SearchInput,
  SelectInput,
} from "react-admin";

const employeeFilters = [
  <SearchInput source="q" alwaysOn />,

  <SelectInput
    source="department"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
  />,
];

export const EmployeeList = () => {
  return (
    <List filters={employeeFilters} perPage={5}>
      <Datagrid rowClick="show">
        <TextField source="prenom" label="Prenom" />
        <TextField source="email" label="Email" />
        <TextField source="departement" label="Département" />

        <NumberField
          source="salaire"
          label="Salaire"
          options={{
            style: "currency",
            currency: "EUR",
          }}
        />

        <BooleanField source="active" label="Actif" />

        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};