import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://manugly-api-xog1-dev.fl0.io";

export async function post(method: string, data: any) {
  let response;

  try {
    response = await axios.post(API_URL + method, data);
  } catch (e) {
    console.log("e :>> ", e);
    return false;
  }

  if (response) {
    return response.data;
  } else {
    return false;
  }
}

export async function postPrivate(method: string, data: any) {
  let response;

  let config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  };

  try {
    response = await axios.post(API_URL + method, data, config);
  } catch (e) {
    console.log("e :>> ", e);
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

  let config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  };

  try {
    response = await axios.get(API_URL + method, config);
  } catch (e) {
    console.log("e :>> ", e);
    return false;
  }

  if (response) {
    return response.data;
  } else {
    return false;
  }
}

export async function getTest(method: string) {
  let config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  };

  const { data } = await axios.get(API_URL + method, config);
  return data;
}
