import { getPrivate, postPrivate, remove } from "@/services/request";

async function createParam(data: any) {
  const response = await postPrivate("/parameters/create", data);
  return response;
}

async function editParam(data: any) {
  const response = await postPrivate(`/parameters/update`, data);
  return response;
}

async function removeParam(data: any) {
  const response = await remove(`/parameters/delete`, data);
  return response;
}

async function setValue(data: any) {
  const response = await postPrivate(`/parameters/setValue`, data);
  return response;
}

async function linkParam(data: any) {
  const response = await postPrivate(`/parameters/linkParam`, data);
  return response;
}

async function getAllParams(businessId: any) {
  const response = await getPrivate(`/parameters/findByBusiness/${businessId}`);
  return response;
}

async function getAllParamsWithValues(businessId: any, userId: any) {
  const response =
    await getPrivate(`/parameters/findByBusiness/${businessId}/${userId}
  `);
  return response;
}

export const paramService = {
  setValue,
  linkParam,
  createParam,
  getAllParams,
  getAllParamsWithValues,
  editParam,
  removeParam,
};
