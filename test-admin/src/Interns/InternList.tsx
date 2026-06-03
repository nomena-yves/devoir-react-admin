import {
  List,
  Datagrid,
  TextField,
  useGetOne,
  useGetList,
  useRecordContext,
  RecordContextProvider,
  SelectInput,
  EditButton,
  DeleteButton
} from "react-admin";

type FramerFieldProps = {
  label?: string;
};

const FramerField = ({ label: _label = "Encadreur" }: FramerFieldProps) => {
  const record = useRecordContext();

  const { data: employe } = useGetOne(
    "employe",
    { id: record?.FramerId },
    {
      enabled: !!record?.FramerId,
    }
  );


  const { data: employes = [] } = useGetList("employe");


  const FramerFromList = employes.find(
    (e) => e.id === record?.FramerId
  );


  const FramerValide =
    employe?.status &&
    employe?.departementId === record?.departementId &&
    FramerFromList;

  if (!record) return null;

  return (
    <span>
      {FramerValide ? (
        <RecordContextProvider value={employe}>
          <TextField source="firstname" />
        </RecordContextProvider>
      ) : (
        "Aucun encadreur valide"
      )}
    </span>
  );
};

type AmountFieldProps = {
  label?: string;
};
const AmountField = ({ label: _label }: AmountFieldProps) => {
  const record = useRecordContext();

  if (!record || !record["pay-status"]) return null;

  return (
    <span>
      {new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(record.amount)}
    </span>
  );
};

const internFilters = [
  <SelectInput
    key="department"
    source="department"
    label="Département"
    choices={[
      { id: "informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
    alwaysOn
  />,
  <SelectInput
    key="pay-status"
    source="pay-status"
    label="Rémunération"
    choices={[
      { id: true, name: "Rémunéré" },
      { id: false, name: "Non rémunéré" },
    ]}
    alwaysOn
  />,
];
AmountField.defaultProps = {
  label: "Salaire",
};

export const InternList = () => (
  <List filters={internFilters}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="firstname" label="nom" />
      <TextField source="lastname" label="prenom" />
      <TextField source="department" label="département" />
      <TextField source="status" label="status" />
      <FramerField label="encadreur" />
      <AmountField label="Montant" />
              <EditButton />
              <DeleteButton />
    </Datagrid>
  </List>
);