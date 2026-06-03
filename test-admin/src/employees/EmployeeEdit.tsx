import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  SelectInput,
  required,
  minValue,
  useRecordContext,
} from "react-admin";


const EmployeeTitle = () => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <span>
      Modifier : {record.firstname} {record.lastname}
    </span>
  );
};

export const EmployeeEdit = () => {
  return (
    <Edit title={<EmployeeTitle />}>
      <SimpleForm>
        <TextInput
          source="prenom"
          label="Prénom"
          validate={required()}
        />

        <TextInput
          source="lastname"
          label="Nom"
          validate={required()}
        />

        <TextInput
          source="email"
          label="Email"
          validate={required()}
        />

        <SelectInput
          source="department"
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
          source="salary"
          label="Salaire"
          validate={[
            required(),
            minValue(1500),
          ]}
        />

        <BooleanInput
          source="active"
          label="Actif"
        />
      </SimpleForm>
    </Edit>
  );
};