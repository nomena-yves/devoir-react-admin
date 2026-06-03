import {
  Show,
  SimpleShowLayout,
  TextField,
  BooleanField,
  NumberField,
  ReferenceField,
} from "react-admin";

export const InternShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" label="ID" />
        <TextField source="firstname" label="Nom" />
        <TextField source="lastname" label="Prénom" />
        <TextField source="email" label="Email" />
        <TextField source="department" label="Département" />
        <TextField source="status" label="Statut" />

        <BooleanField source="pay-status" label="Rémunéré" />

        <NumberField
          source="amount"
          label="Montant"
        />


        <ReferenceField
          source="FramerId"
          reference="employe"
          label="Encadreur"
        >
          <TextField source="firstname" />
        </ReferenceField>

      </SimpleShowLayout>
    </Show>
  );
};