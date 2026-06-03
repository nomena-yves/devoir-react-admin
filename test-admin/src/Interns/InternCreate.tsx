import {
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  NumberInput,
  ReferenceInput,
  FormDataConsumer,
  required,
  email,
  useCreate,
  useNotify,
  useRedirect,
} from "react-admin";

export const InternCreate = () => {
  const [create] = useCreate();
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSubmit = (data: any) => {
    create(
      "interns",
      { data },
      {
        onSuccess: () => {
          notify("Stagiaire créé avec succès");
          redirect("list", "interns");
        },
        onError: () => {
          notify("Erreur lors de la création", { type: "error" });
        },
      }
    );
  };

  return (
    <SimpleForm onSubmit={handleSubmit}>
      <TextInput
        source="firstname"
        label="Nom"
        validate={required()}
      />

      <TextInput
        source="lastname"
        label="Prénom"
        validate={required()}
      />

      <TextInput
        source="email"
        label="Email"
        validate={[required(), email()]}
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
  );
};