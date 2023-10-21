import { getTest, postPrivate } from "@/services/request";

async function createParam(data: any) {
  const response = await postPrivate("/parameters/create", data);
  return response;
}

async function editParam(data: any) {
  const response = await postPrivate(`/parameters/edit`, data);
  return response;
}

async function getAllParams(businessId: any) {
  const response = await getTest(`/parameters/findByBusiness/${businessId}`);
  return response;
}

export const paramService = {
  createParam,
  getAllParams,
  editParam,
};
