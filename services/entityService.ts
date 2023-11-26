import { getPrivate, postPrivate, remove as removeEntity } from "./request";

export default function entityService(entity: string) {
  const getAll = async (id: string) => {
    const response = await getPrivate(`/${entity}/findAll/${id}`);
    return response;
  };
  const get = async (id: string) => {
    const response = await getPrivate(`/${entity}/findById/${id}`);
    return response;
  };
  const create = async (data: any) => {
    const response = await postPrivate(`/${entity}/create`, data);
    return response;
  };
  const edit = async (data: any) => {
    const response = await postPrivate(`/${entity}/update`, data);
    return response;
  };
  const remove = async (id: string) => {
    const response = await removeEntity(`/${entity}/remove/${id}`, {});
    return response;
  };

  return { getAll, get, create, edit, remove };
}
