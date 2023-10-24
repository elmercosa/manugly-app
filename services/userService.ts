import { get, getTest, postPrivate } from "@/services/request";

async function getAllUsers(id: string) {
  const response = await getTest(`/users/findAll/${id}`);
  return response;
}

async function getUser(id: string) {
  const response = await get(`/users/${id}`);
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

export const userService = {
  createUser,
  getAllUsers,
  getUser,
  getBusiness,
};
