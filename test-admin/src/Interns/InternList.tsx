import {
  List,
  Datagrid,
  TextField,
  useGetOne,
  useGetList,
  useRecordContext,
  RecordContextProvider,
} from "react-admin";

type  FramerFieldProps = {
  label?: string;
};

const FramerField = ({ label:_label = "Encadreur" }: FramerFieldProps) => {
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
    employe?.actif &&
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

export const InternList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="firstname" label="nom" />
      <TextField source="lastname" label="prenom" />
      <TextField source="department" label="département" />
      <TextField source="status" label="status" />
      <FramerField label="encadreur" />
    </Datagrid>
  </List>
);