import axios from "axios";

const API_URL = "https://manugly-api-xog1-dev.fl0.io";

export async function post(method: string, data: any) {
  let response;

  try {
    response = await axios.post(API_URL + method, data);
    console.log("response :>> ", response);
  } catch (e) {
    return false;
  }

  if (response) {
    return response.data;
  } else {
    return false;
  }
}

export async function get(method: string) {
  let response;

  try {
    response = await axios.get(API_URL + method);
  } catch (e) {
    return false;
  }

  if (response) {
    return response.data;
  } else {
    return false;
  }
}
