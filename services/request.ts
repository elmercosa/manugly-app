import axiosInstance from "@/lib/axiosInstance";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function post(method: string, data: any) {
  let response;

  try {
    response = await axiosInstance.post(API_URL + method, data);
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

export async function getPrivate(method: string) {
  const { data } = await axiosInstance.get(API_URL + method);
  return data;
}

export async function postPrivate(method: string, values: any) {
  let config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  };

  const { data } = await axiosInstance.post(API_URL + method, values, config);
  return data;
}

export async function remove(method: string, values: any) {
  let response;

  let headers = {
    "Content-type": "application/json",
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
  };

  const { data } = await axiosInstance.delete(API_URL + method, {
    data: values,
    headers,
  });
  return data;
}

export async function edit(method: string, data: any) {
  let response;

  let headers = {
    "Content-type": "application/json",
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
  };

  try {
    response = await axiosInstance.patch(API_URL + method, { data, headers });
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
    response = await axiosInstance.get(API_URL + method, config);
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
