import { useRecordContext, useGetList } from "react-admin";

export const DepartmentStats = () => {
  const employee = useRecordContext();

  const {
    total,
    isPending,
    error,
  } = useGetList(
    "employe",
    {
      filter: {
        department: employee?.department,
        status: true,
      },
      pagination: {
        page: 1,
        perPage: 1,
      },
    },
    {
      enabled: !!employee?.department,
    }
  );

  if (!employee) return null;

  if (isPending) {
    return <p>Calcul des statistiques...</p>;
  }

  if (error) {
    return <p>Erreur lors du calcul des statistiques.</p>;
  }

  return (
    <div>
      <h3>Statistiques du département</h3>

      <p>
        Collègues actifs dans le département{" "}
        <strong>{employee.department}</strong> :{" "}
        {total ?? 0}
      </p>
    </div>
  );
};