import { useRecordContext } from "react-admin";

 const InternTitle = () => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <span>
      Modifier : {record.firstname} {record.lastname}
    </span>
  );
}; 

import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  NumberInput,
  ReferenceInput,
  FormDataConsumer,
  required,
  email,
  useUpdate,
  useNotify,
  useRedirect,
} from "react-admin";

export const InternEdit = () => {
  const [update] = useUpdate();
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSubmit = (data: any) => {
    update(
      "interns",
      {
        id: data.id,
        data,
      },
      {
        onSuccess: () => {
          notify("Modification réussie");
          redirect("list", "interns");
        },
        onError: () => {
          notify("Erreur lors de la modification", { type: "error" });
        },
      }
    );
  };

  return (
    <Edit title={<InternTitle />}>
      <SimpleForm onSubmit={handleSubmit}>
        
        <TextInput
          source="firstname"
          label="Nom"
          validate={required()}
          fullWidth
        />

        <TextInput
          source="lastname"
          label="Prénom"
          validate={required()}
          fullWidth
        />

        <TextInput
          source="email"
          label="Email"
          validate={[required(), email()]}
          fullWidth
        />

        <SelectInput
          source="department"
          label="Département"
          validate={required()}
          choices={[
            { id: "informatique", name: "Informatique" },
            { id: "Marketing", name: "Marketing" },
            { id: "RH", name: "RH" },
            { id: "Finance", name: "Finance" },
          ]}
        />

        <SelectInput
          source="status"
          label="Statut"
          validate={required()}
          choices={[
            { id: "actif", name: "Actif" },
            { id: "inactif", name: "Inactif" },
          ]}
        />

        <BooleanInput
          source="pay-status"
          label="Rémunéré"
        />

        <FormDataConsumer>
          {({ formData }) =>
            formData["pay-status"] ? (
              <NumberInput
                source="amount"
                label="Montant"
                validate={required()}
              />
            ) : null
          }
        </FormDataConsumer>

        <FormDataConsumer>
          {({ formData }) =>
            formData.department ? (
              <ReferenceInput
                source="FramerId"
                reference="employe"
                filter={{
                  department: formData.department,
                  status: true,
                }}
              >
                <SelectInput
                  optionText="firstname"
                  label="Encadreur"
                />
              </ReferenceInput>
            ) : null
          }
        </FormDataConsumer>

      </SimpleForm>
    </Edit>
  );
};