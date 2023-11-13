import { getTest, postPrivate, remove } from "@/services/request";

async function getAllSlots(businessId: any) {
  const response = await getTest(`/slots`);
  return response;
}

async function removeSlot(id: any) {
  const response = await remove(`/slots/${id}`, {});
  return response;
}

async function createSlot(data: any) {
  const response = await postPrivate(`/slots`, data);
  return response;
}

export const slotService = {
  createSlot,
  getAllSlots,
  removeSlot,
};
