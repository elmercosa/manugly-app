import { edit, getPrivate, postPrivate, remove } from "@/services/request";

const columns = [
  {
    key: "name",
    label: "Nombre",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "roles",
    label: "Roles",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];

export const employeeService = {
  columns,
};
