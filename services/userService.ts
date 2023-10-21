import { get, getTest, post } from "@/services/request";

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

export const userService = {
  getAllUsers,
  getUser,
  getBusiness,
};
