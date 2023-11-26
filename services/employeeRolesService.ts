import { edit, getPrivate, postPrivate, remove } from "@/services/request";

const columns = [
  {
    key: "name",
    label: "Nombre",
  },
  {
    key: "description",
    label: "Descripción",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];

export const employeeRolesService = {
  columns,
};
