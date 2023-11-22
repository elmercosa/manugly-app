import { edit, getTest, postPrivate, remove } from "@/services/request";

async function getAllUsers(id: string) {
  const response = await getTest(`/users/findAll/${id}`);
  return response;
}

async function getUser(id: string) {
  const response = await getTest(`/users/findOne/${id}`);
  return response;
}

async function getBusiness() {
  const response = await getTest("/businesses");
  return response;
}

async function createUser(data: any, businessId: any) {
  const response = await postPrivate(`/users/create/${businessId}`, data);
  return response;
}

async function editUser(data: any, userId: any) {
  const response = await postPrivate(`/users/edit/${userId}`, data);
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
  getBusiness,
  editUser,
  removeUser,
};
