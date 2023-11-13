import { postPrivate } from "@/services/request";

async function sendFeedback(data: any) {
  const response = await postPrivate("/feedbacks", data);
  return response;
}

export const feedbackService = {
  sendFeedback,
};
