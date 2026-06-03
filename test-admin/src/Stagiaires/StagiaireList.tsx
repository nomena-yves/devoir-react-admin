import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
} from "react-admin";

export const StagiareList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="nom" />
      <TextField source="prenom" />
      <TextField source="departement" />
      <TextField source="status" />
       <ReferenceField source="encadreureId" reference="employe">
        <TextField source="prenom" label="encadreur"></TextField>
      </ReferenceField>
    </Datagrid>
  </List>
);