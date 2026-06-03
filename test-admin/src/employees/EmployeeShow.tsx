import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  TopToolbar,
  ListButton,
  EditButton,
} from "react-admin";

const EmployeeShowActions = () => {
  return (
    <TopToolbar>
      <ListButton />
      <EditButton />
    </TopToolbar>
  );
};

export const EmployeeShow = () => {
  return (
    <Show actions={<EmployeeShowActions />}>
      <SimpleShowLayout>
        <TextField source="prenom" label="Prénom" />

        <TextField source="lastname" label="Nom" />

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
      </SimpleShowLayout>
    </Show>
  );
};