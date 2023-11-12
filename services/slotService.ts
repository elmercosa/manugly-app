import { getTest, postPrivate, remove } from "@/services/request";

async function getAllSlots(businessId: any) {
  const response = await getTest(`/slots/findByBusiness/${businessId}`);
  return response;
}

async function removeParam(data: any) {
  const response = await remove(`/slots/delete`, data);
  return response;
}

async function linkParam(data: any) {
  const response = await postPrivate(`/slots/linkParam`, data);
  return response;
}

export const slotService = {
  linkParam,
  getAllParams: getAllSlots,
  removeParam,
};
