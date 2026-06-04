import { useRecordContext, useGetOne } from "react-admin";

export const ManagerCard = () => {

  const intern = useRecordContext();

  const {
    data: manager,
    isPending,
    error,
  } = useGetOne(
    "employe",
    { id: intern?.FramerId },
    {
      enabled: !!intern?.FramerId,
    }
  );

  if (isPending) {
    return <div>Chargement du manager...</div>;
  }


  if (error) {
    return (
      <div>
        Erreur lors du chargement du manager.
      </div>
    );
  }

  
  if (!manager) {
    return <div>Aucun manager trouvé.</div>;
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "16px",
      }}
    >
      <h3>Manager</h3>

      <p>
        <strong>Nom complet :</strong>{" "}
        {manager.firstname}
      </p>

      <p>
        <strong>Département :</strong>{" "}
        {manager.department}
      </p>

      <p>
        <strong>Email :</strong>{" "}
        <a href={`mailto:${manager.email}`}>
          {manager.email}
        </a>
      </p>

      <p>
        <strong>Statut :</strong>{" "}
        {manager.status ? "Actif" : "Inactif"}
      </p>
    </div>
  );
};