import { edit, getPrivate, postPrivate, remove } from "@/services/request";

const columns = [
  {
    key: "name",
    label: "Nombre",
  },
  {
    key: "surname",
    label: "Apellidos",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];

async function getAllUsers(id: string) {
  const response = await getPrivate(`/users/findAll/${id}`);
  return response;
}

async function getUser(id: string) {
  const response = await getPrivate(`/users/findById/${id}`);
  return response;
}

async function createUser(data: any, businessId: any) {
  const response = await postPrivate(`/users/create/${businessId}`, data);
  return response;
}

async function editUser(data: any, userId: any) {
  const response = await postPrivate(`/users/update`, data);
  return response;
}

async function removeUser(id: any) {
  const response = await remove(`/users/${id}`, {});
  return response;
}

export const userService = {
  createUser,
  getAllUsers,
  getUser,
  editUser,
  removeUser,
  columns,
};
