import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  SelectInput,
  required,
  minValue,
} from "react-admin";

export const EmployeeCreate = () => {
  return (
    <Create redirect="list">
      <SimpleForm>
        <TextInput
          source="prenom"
          label="Prénom"
          validate={required()}
        />

        

        <TextInput
          source="email"
          label="Email"
          validate={required()}
        />

        <SelectInput
          source="departement"
          label="Département"
          validate={required()}
          choices={[
            { id: "Informatique", name: "Informatique" },
            { id: "Marketing", name: "Marketing" },
            { id: "RH", name: "RH" },
            { id: "Finance", name: "Finance" },
          ]}
        />

        <NumberInput
          source="salaire"
          label="Salaire"
          validate={[
            required(),
            minValue(1500),
          ]}
        />

        <BooleanInput
          source="active"
          label="Actif"
          defaultValue={true}
        />
      </SimpleForm>
    </Create>
  );
};