import { get, post } from "@/services/request";

async function getAllUsers() {
  const response = await get("/users");
  return response;
}

async function getUser(id: string) {
  const response = await get(`/users/${id}`);
  return response;
}

export const userService = {
  getAllUsers,
  getUser,
};
