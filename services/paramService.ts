import { getPrivate, postPrivate, remove } from "@/services/request";

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
  getAllParams,
  getAllParamsWithValues,
};
