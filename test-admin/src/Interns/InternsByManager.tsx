import { useRecordContext, useGetList } from "react-admin";
import { Link } from "react-router-dom";

export const InternsByManager = () => {
  const employee = useRecordContext();

  const {
    data: interns = [],
    isPending,
    error,
  } = useGetList("interns", {
    filter: {
      FramerId: employee?.id,
    },
  });

  if (!employee) return null;

  if (isPending) {
    return <p>Chargement des stagiaires...</p>;
  }

  if (error) {
    return <p>Erreur lors du chargement des stagiaires.</p>;
  }

  return (
    <div>
      <h3>Stagiaires encadrés ({interns.length})</h3>

      {interns.length === 0 ? (
        <p>Aucun stagiaire encadré.</p>
      ) : (
        <ul>
          {interns.map((intern: any) => (
            <li key={intern.id}>
              <strong>
                {intern.firstname} {intern.lastname}
              </strong>
              <br />
              Département : {intern.department}
              <br />
              Statut : {intern.status}
              <br />
              <Link to={`/interns/${intern.id}/show`}>
                Voir la fiche
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};