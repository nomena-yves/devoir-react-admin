import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  BooleanField,
} from "react-admin";

import { InternsByManager } from "../Interns/InternsByManager";
import { DepartmentStats } from "../Interns/DepartmentStats";

export const EmployeeShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="firstname" />
      <EmailField source="email" />
      <TextField source="department" />
      <BooleanField source="status" />

      <DepartmentStats />

      <InternsByManager />
    </SimpleShowLayout>
  </Show>
);