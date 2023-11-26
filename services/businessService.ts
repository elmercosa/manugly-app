import { getPrivate, postPrivate } from "@/services/request";

async function createBusiness(data: any) {
  const response = await postPrivate("/businesses/create", data);
  return response;
}

async function getBusiness(id: any) {
  const response = await getPrivate(`/businesses/findAll/${id}`);
  return response;
}

export const businessService = {
  getBusiness,
  createBusiness,
};
