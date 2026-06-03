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
        <TextField source="firstname" label="Prenom" />
        <TextField source="email" label="Email" />
        <TextField source="department" label="Département" />

        <NumberField
          source="salary"
          label="Salaire"
          options={{
            style: "currency",
            currency: "EUR",
          }}
        />

        <BooleanField source="status" label="Actif" />

        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};