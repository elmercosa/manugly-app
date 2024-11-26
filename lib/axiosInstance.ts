import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Reemplaza con la URL de tu API
});

// Interceptor para agregar el token de acceso a cada petición
axiosInstance.interceptors.request.use(
  async (config) => {
    let session = await getSession();

    if (!session) {
      session = await getServerSession(authOptions);
    }

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
