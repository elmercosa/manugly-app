import { getTest, postPrivate } from "@/services/request";

async function createBusiness(data: any) {
  const response = await postPrivate("/businesses", data);
  return response;
}

async function getBusiness(id: any) {
  const response = await getTest(`/businesses`);
  return response;
}

export const businessService = {
  getBusiness,
  createBusiness,
};
